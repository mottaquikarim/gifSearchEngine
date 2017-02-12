(function() { // protect the lemmings!
			  // IIFE: immediately invoked function expression
			  // ajax example broadcast link: http://samantha.fewd.us/#broadcast/mottaquikarim/ajax_simple_example

	// declare variables that select the specific UI elements
	// we need for this interaction to work

	const button = document.querySelector('.js-search');
	const input = document.querySelector('.js-gif-input');

	function validateSearch() {
		const searchTerm = input.value;

		if (searchTerm.trim() === "") {
			alert('Please input a value!')
			return;
		}

		input.setAttribute('disabled', 'disabled');
		button.setAttribute('disabled', 'disabled');

		// IF WE MAKE IT HERE, then we should do an ajax call, yo
		gifSearch(searchTerm, (response) => {
			console.log('look ma! im in a callback')
			input.value = "";
			input.removeAttribute('disabled');
			button.removeAttribute('disabled');
		});
	}

	/*
		In the gifSearchEngine project, write a function that will make a GET request to the Giphy API.
 
		Your function should support passing in the following parameters (from the API docs) as well:

		q - search query term or phrase
		limit - (optional) number of results to return, maximum 100. Default 25.
		offset - (optional) results offset, defaults to 0.
		rating - (optional) limit results to those rated (y,g, pg, pg-13 or r).
	*/
	const requireParam = () => { 
		throw new Error('This is a required parameter!') 
	}; // REMEMBER: () => {} is an anonymous function! basically this: function() {}

	// this is the gif search function
	const gifSearch = (q = requireParam(), callback, limit = 10, offset = 0, rating = 'pg-13') => {
		let url = 'http://api.giphy.com/v1/gifs/search?';

		// add the API KEY
		url += 'api_key=dc6zaTOxFJmzC';

		// add the query
		url += '&q=' + q;

		// add the limit
		url += '&limit=' + limit;

		// add offset
		url += '&offset=' + offset;

		// add rating
		url += '&rating=' + rating;

		console.log('ABOUT TO MAKE REQUEST TO URL...');
		console.log(url);
		console.log('LOL')

		const http = new XMLHttpRequest();

		http.onreadystatechange = () => {
			const isReqReady = http.readyState === XMLHttpRequest.DONE;
			const isReqDone = http.status === 200;

			if (isReqReady && isReqDone) {
      			callback(JSON.parse(http.responseText));
      		} // if request is complete, show the goodz
		}

		 http.open('GET', url);
		 http.send();
	} // gifSearch

	button.addEventListener('click', (e) => validateSearch());
	input.addEventListener('keydown', (e) => {
		if (e.keyCode === 13) {
			validateSearch();
		}
	});

})();