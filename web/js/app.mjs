import loadData from './charts.mjs'
import {
	generateTable,
	clearTable
} from './table.mjs'
import generateStatisticTable from './statisticsTable.mjs'

// Get response from server side
const getResponse = async (ticker) => {
	try {
		const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		const resp = await fetch('/stock?ticker=' + ticker, {
			credentials: 'same-origin',
			headers: {
				'CSRF-Token': token,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
		if (resp.status !== 200) {
			throw new Error(resp.status)
		}
		return resp.json()
	} catch (error) {
		return error
	}
}

// Form submit
document.getElementById('search').addEventListener('submit', async (e) => {
	e.preventDefault()
	// Fetch data
	const ticker = document.getElementById('input_ticker').value.toUpperCase()
	try {
		// Add loading class for button
		document.getElementById('submit_button').classList.add('is-loading')

		const response = await getResponse(ticker)

		// Clear table
		clearTable()

		// Push data to charts
		loadData(response)

		// Generate table
		generateTable(response)

		generateStatisticTable(response)

		// Load tragingview live chart
		document.getElementById('iframe_chart').src = 'static/liveChart.html?stock=' + ticker

		// Remove loading class from button
		document.getElementById('submit_button').classList.remove('is-loading')
	} catch (error) {
		document.getElementById('error-modal').classList.add('is-active')
		document.getElementById('error-stock').innerHTML = ticker
	}
})