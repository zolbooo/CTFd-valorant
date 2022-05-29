from CTFd.models import db

class AgentChoice(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	agent_name = db.Column(db.String, unique=True)
	team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))

	def __init__(self, id, agent_name, team_id):
		self.id = id
		self.agent_name = agent_name
		self.team_id = team_id

	def __repr__(self) -> str:
		return f'<AgentChoice {self.agent_name} {self.team_id}>'
