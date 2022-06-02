from flask_restx import Namespace, Resource

from CTFd.api import CTFd_API_v1
from CTFd.utils.dates import ctf_started, ctf_ended

from .models import AgentChoice

valorant_namespace = Namespace("valorant", "Endpoint to retrieve Valorant data")

@valorant_namespace.route("/picks")
class AgentPickList(Resource):
	@valorant_namespace.doc(
		description="Get a list of all team and their agent picks",
		responses={
			200: "Success",
		},
	)
	def get(self):
		choices = AgentChoice.query.all()
		return {"success": True, "data": choices}

@valorant_namespace.route("/ctf-status")
class CTFStatus(Resource):
	@valorant_namespace.doc(
		description="Get the current CTF status",
		responses={
			200: "Success",
		},
	)
	def get(self):
		return {"success": True, "data": {"started": ctf_started(), "ended": ctf_ended()}}

def load_api():
	CTFd_API_v1.add_namespace(valorant_namespace)
