from flask import render_template, Blueprint
from flask import request, redirect, jsonify, session

from CTFd.models import Users, Teams
from CTFd.plugins import register_plugin_assets_directory

def load(app):
	agent_selection = Blueprint('agent_selection', __name__, template_folder='templates')
	@agent_selection.route('/agent', methods=['GET'])
	def view_agent_page():
		if not 'id' in session:
			return redirect('/login')
		user = Users.query.filter_by(id=session['id']).first()
		if user is None:
			return redirect('/login')

		team_id = user.team_id
		if team_id is None:
			return redirect('/team?next=%2Fagent')
		team = Teams.query.filter_by(id=user.team_id).first()
		if team.captain_id != session['id']:
			return render_template('error.html', error="You are not the captain of this team")
		# TODO: check if agent was already selected
		return render_template('agent.html')

	app.register_blueprint(agent_selection)
	register_plugin_assets_directory(app, base_path='/plugins/valorant-agent-selection/assets/')