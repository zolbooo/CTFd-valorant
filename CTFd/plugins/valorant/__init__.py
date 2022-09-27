from functools import wraps

from flask import render_template, Blueprint
from flask import request, redirect, session
from werkzeug.wrappers.json import JSONMixin

from CTFd.models import db, Users, Teams, Challenges, Solves
from CTFd.plugins import register_plugin_assets_directory
from CTFd.utils.user import get_current_team, get_current_user
from CTFd.utils.dates import ctftime
from CTFd.utils.decorators import authed_only, require_team

from .config import config
from .agents import agent_list
from .models import AgentChoice
from .webhook import ValorantWebhook

from .api import load_api

agent_selection = Blueprint('agent_selection', __name__, template_folder='templates')

def load(app):
	config(app)
	if not app.config['VALORANT_WEBHOOK_URL']:
		print('[Valorant] Webhook URL not set. Plugin disabled.')
		return

	webhook = ValorantWebhook(app.config['VALORANT_WEBHOOK_URL'], app.config['VALORANT_WEBHOOK_SECRET'])

	app.db.create_all()
	load_api()

	@agent_selection.route('/agent', methods=['GET'])
	@authed_only
	@require_team
	def view_agent_page():
		user = get_current_user()
		team = get_current_team()
		if team.captain_id != user.id:
			return render_template('error.html', error="You are not the captain of this team")
		if AgentChoice.query.filter_by(team_id=team.id).first() is not None:
			return render_template('error.html', error="You have already selected agent")

		return render_template(
			'agent.html',
			agents=agent_list,
			chosen_agents=list(map(lambda choice: choice.agent_name, AgentChoice.query.all())),
		)

	@agent_selection.route('/agent', methods=['POST'])
	@authed_only
	@require_team
	def select_agent():
		user = get_current_user()
		team = get_current_team()
		if team.captain_id != user.id:
			return render_template('error.html', error="You are not the captain of this team")
		if AgentChoice.query.filter_by(team_id=team.id).first() is not None:
			return render_template('error.html', error="You have already selected agent")

		req = request.form.to_dict()
		agent = req['agent']
		if agent == "":
			return render_template('error.html', error="You must select an agent")
		if agent not in agent_list:
			return render_template('error.html', error="Wrong agent")
		if AgentChoice.query.filter_by(agent_name=agent).count() >= 2:
			return render_template('error.html', error="Agent is already picked")

		if app.env == 'development':
			team_name = team.name
			print(f'[Valorant] Agent "{agent}" was selected by team "{team_name}"')
			print(f'[Valorant] This message shows only in development mode. In production mode, the agent choice will be saved in server.')
		else:
			db.session.add(AgentChoice(agent_name=agent, team_id=user.team_id, team_name=team.name))
			db.session.commit()

		app.events_manager.publish(data={'agent': agent}, type='agent-selected')
		webhook.send_payload({'type': 'agent-selected', 'team': team.name, 'agent': agent})
		return redirect('/')

	app.register_blueprint(agent_selection)
	register_plugin_assets_directory(app, base_path='/plugins/valorant/assets/')

	def challenge_attempt_decorator(f):
		@wraps(f)
		def wrapper(*args, **kwargs):
			result = f(*args, **kwargs)

			if not ctftime():
				return result
			if isinstance(result, JSONMixin):
				data = result.json

			success = False
			if isinstance(data, dict) and data.get("success") == True and isinstance(data.get("data"), dict):
				success = data.get("data").get("status") == "correct"
			team = get_current_team()

			webhook.send_payload({
				'type': 'submission',
				'success': success,
				'team': {'id': team.id, 'name': team.name}
			})
			return result
		return wrapper

	app.view_functions['api.challenges_challenge_attempt'] = challenge_attempt_decorator(app.view_functions['api.challenges_challenge_attempt'])