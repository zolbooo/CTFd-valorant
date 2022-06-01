import json

from flask import render_template, Blueprint
from flask import request, redirect, session

from CTFd.models import db, Users, Teams
from CTFd.plugins import register_plugin_assets_directory
from CTFd.utils.decorators import authed_only, require_team

from .config import config
from .agents import agent_list
from .models import AgentChoice
from .webhook import ValorantWebhook

agent_selection = Blueprint('agent_selection', __name__, template_folder='templates')

def load(app):
	config(app)
	if not app.config['VALORANT_WEBHOOK_URL']:
		print('[Valorant] Webhook URL not set. Plugin disabled.')
		return

	webhook = ValorantWebhook(app.config['VALORANT_WEBHOOK_URL'], app.config['VALORANT_WEBHOOK_SECRET'])

	app.db.create_all()

	@authed_only
	@require_team
	@agent_selection.route('/agent', methods=['GET'])
	def view_agent_page():
		user = Users.query.filter(Users.id == session['id']).one()
		team = db.session.query(Teams).filter_by(id=user.team_id).one()
		if team.captain_id != session['id']:
			return render_template('error.html', error="You are not the captain of this team")
		if AgentChoice.query.filter_by(team_id=team.id).first() is not None:
			return render_template('error.html', error="You have already selected agent")

		return render_template(
			'agent.html',
			agents=agent_list,
			chosen_agents=list(map(lambda choice: choice.agent_name, AgentChoice.query.all())),
		)

	@authed_only
	@require_team
	@agent_selection.route('/agent', methods=['POST'])
	def select_agent():
		user = Users.query.filter(Users.id == session['id']).one()
		team = db.session.query(Teams).filter_by(id=user.team_id).one()
		if team.captain_id != session['id']:
			return render_template('error.html', error="You are not the captain of this team")
		if AgentChoice.query.filter_by(team_id=team.id).first() is not None:
			return render_template('error.html', error="You have already selected agent")

		req = request.form.to_dict()
		agent = req['agent']
		if agent == "":
			return render_template('error.html', error="You must select an agent")
		if agent not in agent_list:
			return render_template('error.html', error="Wrong agent")
		if AgentChoice.query.filter_by(agent_name=agent).first() is not None:
			return render_template('error.html', error="Agent is already picked")

		if app.env == 'development':
			team_name = team.name
			print(f'[Valorant] Agent "{agent}" was selected by team "{team_name}"')
			print(f'[Valorant] This message shows only in development mode. In production mode, the agent choice will be saved in server.')
		else:
			db.session.commit()
			db.session.add(AgentChoice(agent_name=agent, team_id=user.team_id, team_name=team.name))

		app.events_manager.publish(data={'agent': agent}, type='agent-selected')
		webhook.send_payload({'type': 'agent-selected', 'team': team.name, 'agent': agent})
		return redirect('/')

	app.register_blueprint(agent_selection)
	register_plugin_assets_directory(app, base_path='/plugins/valorant-agent-selection/assets/')