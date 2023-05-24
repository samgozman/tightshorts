import getData from './getData.mjs';

// Form submit
document.getElementById('search').addEventListener('submit', async (e) => {
	e.preventDefault();
	// Fetch data
	let ticker = document.getElementById('input_ticker').value.toUpperCase();
	ticker = await getData(ticker);

	// Change window url
	const link = {
		Page: document.getElementsByTagName('title')[0].text,
		Url: '/quote/' + ticker,
	};
	window.history.pushState(link, link.Page, link.Url);

	document
		.getElementById('menu_shortfork')
		.setAttribute('href', `https://short-fork.extr.app/?stock=${ticker}`);
});
