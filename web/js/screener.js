import Url from 'url-parse';
import kFormatter from './src/utils/kFormatter.mjs';
import { paginate } from './src/paginate.mjs';

// Page elements
const screenerBody = document.getElementById('screenerBody');
const totalStocks = document.getElementById('totalStocks');
const paginationList = document.getElementById('paginationList');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

// Get all availible filters from meta
const allFilters = document.querySelector('meta[name="filters"]').content.split(',').filter(Boolean);
const allRadioGroups = document.querySelector('meta[name="radio_groups"]').content.split(',').filter(Boolean);

// Change skip value in url and update table
const changeSkip = async (skipValue, btn = undefined) => {
	// don't run if button is disabled
	if (btn && btn.hasAttribute('disabled')) return;

	const windowUrl = new URLSearchParams(window.location.search);
	windowUrl.set('skip', skipValue >= 0 ? skipValue : 0);
	history.replaceState(null, null, '?' + windowUrl.toString());
	await generateScreenerTable();
};

// Get url params for filter
const getUrlFilter = () => {
	const { skip, limit, sortby, sortdir, filters } = new Url(window.location.href, true).query;

	return {
		skip: skip || '',
		limit: limit || '',
		sortby: sortby || '',
		sortdir: sortdir || '',
		filters: filters || '',
	};
};

const getFiltredFromServer = async () => {
	try {
		const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
		const { skip, limit, sortby, sortdir, filters } = getUrlFilter();

		const resp = await fetch(
			`/api/filter?limit=${limit}&skip=${skip}&sortby=${sortby}&sortdir=${sortdir}&filters=${filters}`,
			{
				credentials: 'same-origin',
				headers: {
					'CSRF-Token': token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			},
		);
		if (resp.status !== 201) {
			throw new Error(resp.status);
		}
		return resp.json();
	} catch (error) {
		return error;
	}
};

const generatePagination = (totalItems, pageSize = 25, skip = 0) => {
	const thisPage = Math.ceil(skip / pageSize) + 1;
	const { pages, currentPage, totalPages } = paginate(totalItems, thisPage, pageSize);

	// Clear before initiate
	paginationList.innerHTML = '';

	// Create control buttons //
	// Prev button
	if (thisPage === 1) {
		prevButton.setAttribute('disabled', 'disabled');
	} else {
		prevButton.removeAttribute('disabled');
	}

	// Next button
	if (thisPage === totalPages) {
		nextButton.setAttribute('disabled', 'disabled');
	} else {
		nextButton.removeAttribute('disabled');
	}

	// create link for start page
	if (pages[0] !== 1) {
		paginationList.innerHTML += '<li><a class="pagination-link" aria-label="Goto page 1">1</a></li>';
		paginationList.innerHTML +=
			pages[0] !== 2 ? '<li><span class="pagination-ellipsis">&hellip;</span></li>' : '';
	}

	// create links to pages
	for (const page of pages) {
		paginationList.innerHTML += `<li><a class="pagination-link ${
			page === currentPage ? 'is-current' : ''
		}" aria-label="Goto page ${page}">${page}</a></li>`;
	}

	// create link for end page
	if (pages.slice(-1)[0] < totalPages) {
		paginationList.innerHTML +=
			pages.slice(-1)[0] !== totalPages - 1
				? '<li><span class="pagination-ellipsis">&hellip;</span></li>'
				: '';
		paginationList.innerHTML += `<li><a class="pagination-link" aria-label="Goto page ${totalPages}">${totalPages}</a></li>`;
	}

	Array.from(document.getElementsByClassName('pagination-link')).forEach(async function (link) {
		const skipValue = (parseInt(link.textContent) - 1) * pageSize;
		link.addEventListener('click', async () => await changeSkip(skipValue));
	});
};

const nextPrevListeners = async () => {
	prevButton.addEventListener('click', async function () {
		const { skip, limit } = getUrlFilter();
		const skipValue = (parseInt(skip) || 25) - (parseInt(limit) || 25);
		await changeSkip(skipValue, this);
	});

	nextButton.addEventListener('click', async function () {
		const { skip, limit } = getUrlFilter();
		const skipValue = (parseInt(skip) || 0) + (parseInt(limit) || 25);
		await changeSkip(skipValue, this);
	});
};

const generateScreenerTable = async () => {
	// Set section min-height to prevernt from flickering
	const mainSection = document.getElementById('main-section');
	mainSection.style = `min-height: ${mainSection.offsetHeight}px;`;

	// Clear table
	screenerBody.innerHTML = '';

	const result = await getFiltredFromServer();
	totalStocks.textContent = result.count;
	const { skip, limit } = getUrlFilter();

	if (result.count > 0) {
		for (const stock of result.stocks) {
			const row = screenerBody.insertRow();
			const {
				ticker,
				totalVolLast,
				shortVolRatioLast,
				shortExemptVolRatioLast,
				totalVol5DAVG,
				shortVolRatio5DAVG,
				shortExemptVolRatio5DAVG,
				totalVol20DAVG,
				shortVolRatio20DAVG,
				shortExemptVolRatio20DAVG,
			} = stock;
			row.insertCell(0).innerHTML = `<a href="/quote/${ticker}">${ticker}</a>`;
			// today
			row.insertCell(1).innerHTML = totalVolLast ? kFormatter(totalVolLast) : 0;
			row.insertCell(2).innerHTML = (shortVolRatioLast ? shortVolRatioLast.toFixed(2) : 0) + '%';
			row.insertCell(3).innerHTML = (shortExemptVolRatioLast ? shortExemptVolRatioLast.toFixed(2) : 0) + '%';
			// 3 days
			row.insertCell(4).innerHTML = totalVol5DAVG ? kFormatter(totalVol5DAVG) : 0;
			row.insertCell(5).innerHTML = (shortVolRatio5DAVG ? shortVolRatio5DAVG.toFixed(2) : 0) + '%';
			row.insertCell(6).innerHTML =
				(shortExemptVolRatio5DAVG ? shortExemptVolRatio5DAVG.toFixed(2) : 0) + '%';
			// 20 days
			row.insertCell(7).innerHTML = totalVol20DAVG ? kFormatter(totalVol20DAVG) : 0;
			row.insertCell(8).innerHTML = (shortVolRatio20DAVG ? shortVolRatio20DAVG.toFixed(2) : 0) + '%';
			row.insertCell(9).innerHTML =
				(shortExemptVolRatio20DAVG ? shortExemptVolRatio20DAVG.toFixed(2) : 0) + '%';
		}
	}

	generatePagination(result.count, limit || 25, skip);
};

// Reset button
document.getElementById('resetFilters').addEventListener('click', async () => {
	const windowUrl = new URLSearchParams(window.location.search);
	windowUrl.delete('filters');
	history.replaceState(null, null, '?' + windowUrl.toString());
	await changeSkip(0);
	await generateScreenerTable();

	// uncheck all inputs
	for (const filter of allFilters) {
		document.getElementById(filter).checked = false;
	}

	// uncheck all radio groups
	for (const group of allRadioGroups) {
		document.getElementById(group).checked = false;
	}
});

// Sorter
const sorter = () => {
	const ids = [
		'ticker',
		'totalVolLast',
		'shortVolRatioLast',
		'shortExemptVolRatioLast',
		'totalVol5DAVG',
		'shortVolRatio5DAVG',
		'shortExemptVolRatio5DAVG',
		'totalVol20DAVG',
		'shortVolRatio20DAVG',
		'shortExemptVolRatio20DAVG',
	];

	// Remove classes from other sorting columns
	const clearSorter = () => {
		ids.forEach((id) => {
			document.getElementById(id).classList.remove('is-active', 'asc', 'desc');
		});
	};

	// Set sorter url arg
	const changeSorter = async (sort = 'totalVolLast', dir = 'desc') => {
		const windowUrl = new URLSearchParams(window.location.search);
		windowUrl.set('sortby', sort);
		windowUrl.set('sortdir', dir);
		history.replaceState(null, null, '?' + windowUrl.toString());
		await generateScreenerTable();
	};

	ids.forEach((id) => {
		document.getElementById(id).addEventListener('click', async function () {
			const isActive = this.classList.contains('is-active');
			const isDesc = this.classList.contains('desc');
			const isAsc = this.classList.contains('asc');

			// Mark active to show that item was activated
			if (!isActive && !isDesc && !isAsc) {
				clearSorter();
				this.classList.add('is-active', 'desc');
				await changeSorter(id, 'desc');
			} else if (isActive && isDesc) {
				this.classList.replace('desc', 'asc');
				await changeSorter(id, 'asc');
			} else if (isActive && isAsc) {
				this.classList.replace('asc', 'desc');
				await changeSorter(id, 'desc');
			}
		});
	});
};

window.onload = async () => {
	// Parse url string and mark checked filters
	const { filters } = getUrlFilter();
	if (filters) {
		const fls = filters.split(',');
		for (const filter of fls) {
			document.getElementById(filter).checked = true;
		}
	}

	/**
	 * Find query params in the page url and replace them with new ones
	 * @param {string} stringToReplace String to find in url params and replace
	 * @param {string} newString New string to replace previous one
	 */
	function filterQueryParams(stringToReplace, newString) {
		const windowUrl = new URLSearchParams(window.location.search);
		const filtersQuery = windowUrl.get('filters') || '';

		const regex = new RegExp(`(${stringToReplace},|,${stringToReplace}|${stringToReplace})`);
		const newFilters = filtersQuery.replace(regex, '');
		if (newString !== '') {
			windowUrl.set('filters', `${newFilters ? newFilters + ',' : ''}${newString}`);
		} else {
			windowUrl.set('filters', newFilters);
		}
		history.replaceState(null, null, '?' + windowUrl.toString());
	}

	// Radio
	for (const radioGroup of allRadioGroups) {
		const radios = document.getElementsByName(radioGroup);
		const checkbox = document.getElementById(radioGroup);

		// Toggle checkbox onload if any radio is used
		if (radios[0].checked || radios[1].checked) {
			checkbox.checked = true;
		}

		checkbox.addEventListener('change', async () => {
			if (checkbox.checked && !radios[0].checked && !radios[1].checked) {
				radios[0].click();
			} else if (!checkbox.checked) {
				// Remove radios checks
				radios[0].checked = false;
				radios[1].checked = false;

				// Clear url params from them
				filterQueryParams(radios[0].id, '');
				filterQueryParams(radios[1].id, '');

				// Regenerate table
				await changeSkip(0);
				await generateScreenerTable();
			}
		});

		// Iterate radio elements
		for (const radio of radios) {
			radio.addEventListener('change', async () => {
				// If first radio (up) is checked: uncheck the opposite
				if (radios[0].checked) {
					checkbox.checked = true;
					filterQueryParams(radios[1].id, radios[0].id);
				} else if (radios[1].checked) {
					checkbox.checked = true;
					filterQueryParams(radios[0].id, radios[1].id);
				}

				// Regenerate table
				await changeSkip(0);
				await generateScreenerTable();
			});
		}
	}

	// Set event listeners for each input
	for (const filter of allFilters) {
		const input = document.getElementById(filter);

		if (input.type !== 'checkbox') {
			continue;
		}

		// Checkbox
		input.addEventListener('change', async (event) => {
			const windowUrl = new URLSearchParams(window.location.search);
			const fls = windowUrl.get('filters');
			if (event.currentTarget.checked) {
				windowUrl.set('filters', `${fls ? fls + ',' : ''}${filter}`);
				history.replaceState(null, null, '?' + windowUrl.toString());
			} else {
				const regex = new RegExp(`(${filter},|,${filter}|${filter})`);
				windowUrl.set('filters', fls.replace(regex, ''));
				history.replaceState(null, null, '?' + windowUrl.toString());
			}

			await changeSkip(0);

			// Regenerate table after each filter change
			await generateScreenerTable();
		});
	}

	await generateScreenerTable();
	await nextPrevListeners();
	sorter();
};
