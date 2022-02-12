import loadData from './charts.mjs';
import { generateTable, clearTable } from './table.mjs';
import generateStatisticTable from './statisticsTable.mjs';

// Get response from server side
const getResponse = async (ticker) => {
	try {
		const resp = await fetch(`/api/quote/?ticker=${ticker}`, {
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (resp.status !== 201) {
			throw new Error(resp.status);
		}
		return resp.json();
	} catch (error) {
		return error;
	}
};

export const getData = async (ticker) => {
	try {
		// Add loading class for button
		document.getElementById('submit_button').classList.add('is-loading');

		const response = await getResponse(ticker);

		// Clear table
		clearTable();

		// Push data to charts
		loadData(response);

		// Generate table
		generateTable(response);

		generateStatisticTable(response);

		// Load tragingview live chart
		document.getElementById('iframe_chart').src = '../static/liveChart.html?stock=' + response.ticker;

		// Remove loading class from button
		document.getElementById('submit_button').classList.remove('is-loading');

		// Change input value on sanitized one
		const input = document.getElementById('input_ticker');
		if (input.value) {
			input.value = response.ticker;
		}

		return response.ticker;
	} catch (error) {
		document.getElementById('error-modal').classList.add('is-active');
		document.getElementById('error-stock').innerHTML = ticker;
	}
};

export default getData;
