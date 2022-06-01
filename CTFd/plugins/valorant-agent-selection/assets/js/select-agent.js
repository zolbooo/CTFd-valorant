let __selectedAgent = null;
function setSelectedAgent(agent) {
	__selectedAgent = agent;
	if (agent !== null) {
		submitButton.disabled = false;
		artwork.hidden = false;
		artwork.children[0].srcset = `/plugins/valorant-agent-selection/assets/agents/${agent}/artwork.webp`;
		artwork.children[1].src = `/plugins/valorant-agent-selection/assets/agents/${agent}/artwork.png`;
	} else {
		submitButton.disabled = true;
		artwork.hidden = true;
	}
}
function getSelectedAgent() {
	return __selectedAgent;
}

function disableAgent(agent) {
	const agentCardOverlay = document.querySelector(`div.agent-card[data-agent="${agent}"] > .agent-overlay`);
	agentCardOverlay.classList.add('agent-disabled');
	agentCardOverlay.classList.remove('agent-overlay');

	const agentCard = document.querySelector(`div.agent-card[data-agent="${agent}"]`);
	agentCard.classList.remove('cursor-pointer');
	agentCard.dataset.disabled = 'true';
}

const artwork = document.getElementById('artwork');
const submitButton = document.getElementById('submit');
function hydrate() {
	document.body.addEventListener('click', (e) => {
		if (e.target !== e.currentTarget) {
			return;
		}
		setSelectedAgent(null);
	});

	const agentCards = document.querySelectorAll("div.agent-card");
	agentCards.forEach(element => {
		element.addEventListener('click', () => {
			if (element.dataset.disabled) {
				return;
			}
			setSelectedAgent(element.dataset.agent);
		});
	});
}

const eventSource = new EventSource('/events');
eventSource.addEventListener('agent-selected', (message) => {
	const {agent} = JSON.parse(message.data);

	disableAgent(agent);
	if (getSelectedAgent() === agent) {
		setSelectedAgent(null);
	}
});
function submit() {
	const input = document.querySelector('input[name="agent"]');
	input.value = getSelectedAgent();
	if (input.value !== null) {
		eventSource.close();
		document.forms[0].submit();
	}
}

hydrate();
