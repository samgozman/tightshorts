import round from './round.mjs';
import kFormatter from './utils/kFormatter.mjs';

// Gen table
const table_tbody = document.getElementById('table-body');
const array_for_csv = [
	[
		'Date',
		'Short Volume',
		'Short Volume Ratio (%)',
		'Short Exempt Volume',
		'Short Exempt Volume Ratio (%)',
		'Total Volume',
	],
];

const createTableRow = (table, date, sv, svr, sev, sevr, vol) => {
	let row = table.insertRow();
	row.insertCell(0).innerHTML = date;
	row.insertCell(1).innerHTML = kFormatter(sv);
	row.insertCell(2).innerHTML = svr;
	row.insertCell(3).innerHTML = kFormatter(sev);
	row.insertCell(4).innerHTML = sevr;
	row.insertCell(5).innerHTML = kFormatter(vol);
};

const createCSVfile = (link_id, ticker, semicolon = false) => {
	let csvContent = '';
	if (semicolon) {
		csvContent =
			'data:text/csv;charset=utf-8,' +
			array_for_csv
				.map((e) => e.join(';'))
				.join('\r\n')
				.replace(/\./gm, ',');
	} else {
		csvContent = 'data:text/csv;charset=utf-8,' + array_for_csv.map((e) => e.join(',')).join('\r\n');
	}

	const link = document.getElementById(link_id);
	link.setAttribute('href', encodeURI(csvContent));
	link.setAttribute('download', ticker + '_short_volume.csv');
};

export const generateTable = (response) => {
	// Clear CSV array from prev
	array_for_csv.length = 1;
	const reversed_array = response.volume.reverse();
	for (const [i, el] of reversed_array.entries()) {
		const date = el.date.replace(/T(.*)/g, '');
		const svr = round((el.shortVolume / el.totalVolume) * 100);
		const sevr = round((el.shortExemptVolume / el.totalVolume) * 100);
		if (i < 30)
			createTableRow(table_tbody, date, el.shortVolume, svr, el.shortExemptVolume, sevr, el.totalVolume);
		array_for_csv.push([date, el.shortVolume, svr, el.shortExemptVolume, sevr, el.totalVolume]);
	}
	createCSVfile('csv-file-comma', response.ticker);
	createCSVfile('csv-file-semicolon', response.ticker, true);
};

export const clearTable = () => {
	table_tbody.innerHTML = '';
};
