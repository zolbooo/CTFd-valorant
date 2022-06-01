from flask_restx import Namespace, Resource

from CTFd.api import CTFd_API_v1
from CTFd.utils.decorators import admins_only

from .models import AgentChoice

valorant_namespace = Namespace("valorant", "Endpoint to retrieve Valorant data")

@valorant_namespace.route("/picks")
class AgentPickList(Resource):
	@admins_only
	@valorant_namespace.doc(
		description="Get a list of all team and their agent picks",
		responses={
			200: "Success",
		},
	)
	def get(self):
		choices = AgentChoice.query.all()
		return {"success": True, "data": choices}

def load_api():
	CTFd_API_v1.add_namespace(valorant_namespace)
