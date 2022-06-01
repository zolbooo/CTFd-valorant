import json
import hashlib
import requests

from CTFd.utils.security.signing import hmac

class ValorantWebhook:
	def __init__(self, url, secret) -> None:
		self.url = url
		self.secret = secret

	def send_payload(self, data):
		json_data = json.dumps(data)
		headers = {'Content-Type': 'application/json'}
		if self.secret:
			headers['X-Valorant-Signature'] = hmac(json_data, self.secret, digest=hashlib.sha256)

		response = requests.post(self.url, data=json_data, headers=headers)
		if response.status_code != 200:
			print(f"Error sending payload to {self.url}")
			print(f"Status code: {response.status_code}")
			print(f"Response: {response.text}")
			return False
		return True
