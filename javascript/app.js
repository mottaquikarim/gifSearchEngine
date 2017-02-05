(function() { // protect the lemmings!


	const button = document.querySelector('.js-search');
	const input = document.querySelector('.js-gif-input');

	function validateSearch() {
		const searchTerm = input.value;
		input.value = "";

		if (searchTerm.trim() === "") {
			alert('Please input a value!')
			return;
		}

		input.setAttribute('disabled', 'disabled');
		button.setAttribute('disabled', 'disabled');
	}

	button.addEventListener('click', (e) => validateSearch());
	input.addEventListener('keydown', (e) => {
		if (e.keyCode === 13) {
			validateSearch();
		}
	});

})();