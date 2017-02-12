(function() { // protect the lemmings!

	const requireParam = () => { 
		throw new Error('This is a required parameter!') 
	}; // REMEMBER: () => {} is an anonymous function! basically this: function() {}

	// this is the gif search function
	const gifSearch = (q = requireParam(), callback, limit = 10, offset = 0, rating = 'pg-13') => {
		return new Promise((resolve, reject) => {

		})
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

	// how to promisify gifSearch
	const gifSearchPromise = (q = requireParam(), limit = 10, offset = 0, rating = 'pg-13') => {
		return new Promise((resolve, reject) => {
			gifSearch(q, (response) => {
				resolve(response)
			}, limit, offset, rating);
		});
	}

	gifSearch('pandas', (response1) => {
		console.log('pandas', response1);

		gifSearch('kangaroos', (response2) => {
			console.log('kangaroos',response2);
		});
	});

	gifSearchPromise('pandas')
		.then((results) => {
			console.log('pandas', results);

			return gifSearchPromise('kangaroos');
		})
		.then((results) => {
			console.log('kangaroos', results)
		});

	const pandasSearch = gifSearchPromise('pandas');
	const kangaroosSearch = pandasSearch.then(() => {
		return gifSearchPromise('kangaroos');
	})


	Promise.all([pandasSearch, kangaroosSearch]).then(function(results) {
		console.log(results)
	});


	gifSearch('pandas', (response1) => {
		// when the search comes back, let's do something here
	});

	const mySearch = gifSearchPromise('pandas');
	// do some shit, who cares

	mySearch.then((response) => {
		// when the search comes back, let's do something here
	});

})();