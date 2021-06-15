import getData from './getData.mjs'

// Form submit
document.getElementById('search').addEventListener('submit', async (e) => {
	e.preventDefault()
	// Fetch data
	const ticker = document.getElementById('input_ticker').value.toUpperCase()
	await getData(ticker)
})