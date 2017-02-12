(function() { // protect the lemmings!
			  // IIFE: immediately invoked function expression
			  // ajax example broadcast link: http://samantha.fewd.us/#broadcast/mottaquikarim/ajax_simple_example

	// declare variables that select the specific UI elements
	// we need for this interaction to work

	const button = document.querySelector('.js-search');
	const input = document.querySelector('.js-gif-input');
	const container = document.querySelector('.js-data');

	const onResponse = (response) => {
		const searchTerm = response.searchTerm;

		console.log('look ma! im in a callback', response);
		// clear stuff inside the container
		container.innerHTML = "";

		for (const imageData of response.data) {
			const imageUrl = imageData.images.original.url;

			const imageTag = document.createElement('img');
			imageTag.src = imageUrl;
			// ALTERNATE WAY:
			// imageTag.setAttribute('src', imageUrl);

			// todo:
			// 1. create div [DONE]
			// 2. add class column to it [DONE]
			// 3. append imageTag to it [DONE]
			// 4. add div to container []

			// create empty div
			const div = document.createElement('div');
			// add class to it
			div.classList.add('column');	
			// add the img for gif to div
			div.appendChild(imageTag);
			// add div to container
			container.appendChild(div);
		}

		const btnContainer = document.createElement('div');
		btnContainer.classList.add('four', 'columns');

		const nextBtn = document.createElement('button');
		nextBtn.innerHTML = "Next";
		nextBtn.classList.add('ui', 'button', 'fluid', 'js-next-btn');

		nextBtn.addEventListener('click', (e) => {
			// call gifSearch();
			console.log(response.pagination.offset, response.pagination.offset + response.pagination.count)
			const count = response.pagination.count;
			const offset = count + response.pagination.offset;
			
			gifSearch(searchTerm, onResponse, count, offset)
		});

		btnContainer.appendChild(nextBtn);
		container.appendChild(btnContainer);

		input.value = "";
		input.removeAttribute('disabled');
		button.removeAttribute('disabled');
	}; // this makes the function reusable

	function validateSearch() {
		const searchTerm = input.value;

		if (searchTerm.trim() === "") {
			alert('Please input a value!')
			return;
		}

		input.setAttribute('disabled', 'disabled');
		button.setAttribute('disabled', 'disabled');

		// IF WE MAKE IT HERE, then we should do an ajax call, yo
		// onResponse is pulled out from this function
		// so that we could *potentially maybe* reuse
		gifSearch(searchTerm, onResponse, 2);
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

		const http = new XMLHttpRequest();

		http.onreadystatechange = () => {
			const isReqReady = http.readyState === XMLHttpRequest.DONE;
			const isReqDone = http.status === 200;

			if (isReqReady && isReqDone) {
				const data = JSON.parse(http.responseText);
				data.searchTerm = q;

      			callback(data);
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