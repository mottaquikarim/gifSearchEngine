(function() {

	function gifSearch(searchTerm) {
		return new Promise((resolve, reject) => {
			let url = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + searchTerm;
			const http = new XMLHttpRequest();

			http.onreadystatechange = () => {
				const isReqReady = http.readyState === XMLHttpRequest.DONE;
				const isReqDone = http.status === 200;

				if (isReqReady && isReqDone) {
					// NOW DONE
					console.log('DONE')
					resolve(JSON.parse(http.responseText));
				}
				else {
					reject('LOL you fucked up')
				}
			}

			http.open('GET', url);
			http.send();
		});
	}

	const p1 = gifSearch('pandas');
	const p2 = p1.then(() => gifSearch('bulls'));

	Promise.all([p1, p2])
		.then((results) => {
			console.log(results)
		})
		.catch((e) => {
			console.log(e)
		});

	/*	you can turn anything into promises..
		function add(a,b) {
			return new Promise((resolve, reject) => resolve(a+b));
		}

		add(1,2).then((sum) => console.log(sum));
	*/

})();