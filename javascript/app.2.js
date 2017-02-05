(function() { // protect the lemmings!

	function validateSearch(e) {
		const keyPressEvt = e.type === 'keydown' && e.which === 13;
		const clickEvt = e.type === 'click';

		if ( keyPressEvt || clickEvt ) {
			const searchTerm = input.value;
			input.value = "";

			if (searchTerm.trim() === "") {
				alert('Please input a value!')
				return;
			}

			input.setAttribute('disabled', 'disabled');
			button.setAttribute('disabled', 'disabled');
		}
		
	}

	
	const button = document.querySelector('.js-search');
	const input = document.querySelector('.js-gif-input');

	button.addEventListener('click', (e) => validateSearch(e));
	input.addEventListener('keydown', (e) => validateSearch(e));

})();