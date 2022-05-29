from flask import render_template, Blueprint
from flask import request, redirect, jsonify, session

from CTFd.models import db, Users, Teams
from CTFd.plugins import register_plugin_assets_directory
from CTFd.utils.decorators import authed_only, require_team

from .models import AgentChoice

agent_selection = Blueprint('agent_selection', __name__, template_folder='templates')

def load(app):
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
		return render_template('agent.html')

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
		if req['agent'] == "":
			return render_template('error.html', error="You must select an agent")
		# TODO: Validate value against list of agents
		return redirect('/')

	app.register_blueprint(agent_selection)
	register_plugin_assets_directory(app, base_path='/plugins/valorant-agent-selection/assets/')