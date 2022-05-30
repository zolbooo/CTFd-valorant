let selectedAgent = null;
function hydrate() {
	const artwork = document.getElementById('artwork');
	const onClick = agent => () => {
		selectedAgent = agent;
		artwork.children[0].srcset = `/plugins/valorant-agent-selection/assets/agents/${agent}/artwork.webp`;
		artwork.children[1].src = `/plugins/valorant-agent-selection/assets/agents/${agent}/artwork.png`;
	};

	const agentCards = document.querySelectorAll("div.agent-card");
	agentCards.forEach(element => {
		element.addEventListener('click', onClick(element.dataset.agent));
	});
}

function submit() {
	const input = document.querySelector('input[name="agent"]');
	input.value = selectedAgent;
	document.forms[0].submit();
}

hydrate();
