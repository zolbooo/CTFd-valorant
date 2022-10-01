from CTFd.models import db

class AgentChoice(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	agent_name = db.Column(db.String(32))
	team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
	team_name = db.Column(db.String(128), unique=True)
	def __repr__(self) -> str:
		return f'<AgentChoice {self.agent_name} {self.team_name}>'
