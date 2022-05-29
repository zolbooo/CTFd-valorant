let selectedAgent = "test";
function hydrate() {
	// TODO
}

function submit() {
	const input = document.querySelector('input[name="agent"]');
	input.value = selectedAgent;
	document.forms[0].submit();
}

hydrate();
