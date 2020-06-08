// Giphy search app
// Take user input and on search, connect to Giphy API and append a random gif to the DOM
// can remove all gifs by selecting the delete button

// get the user input in the form and wait for the response from giphy's api
$('#searchForm').on('submit', async function(e) {
	e.preventDefault();

	// get the user input on the search field
	let $searchTerm = $('#searchTerm').val();
	// put the user input value in quotes for the URL parameters below
	$('#searchTerm').val('');

	// if empty input do not search
	if (!$searchTerm) {
		return;
	}

	// await the response from giphy, using the searchTerm and key (given)
	const searchData = await axios.get('http://api.giphy.com/v1/gifs/search', {
		params: { q: $searchTerm, key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym' }
	});

	addGif(searchData);
});

// create element on the page and put the gif url as the source of the img in that element
function addGif(searchData) {
	// get a random number based on the number of gifs returned
	const gifIndex = Math.floor(Math.random() * searchData.data.data.length);

	const gifUrl = searchData.data.data[gifIndex].images.original.url;

	const gif = document.createElement('img');
	gif.setAttribute('src', gifUrl);
	const gifArea = document.getElementById('gifs');

	gifArea.append(gif);
}

// when remove button is clicked empty the #gifs div
$('#remove').on('click', function() {
	$('#gifs').empty();
});
