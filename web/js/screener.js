import Url from 'url-parse'
import {
	paginate
} from './src/paginate.mjs'

// Page elements
const screener = document.getElementById('screenerBody')
const totalStocks = document.getElementById('totalStocks')
const paginationList = document.getElementById('paginationList')
const controlButtons = document.getElementById('controlButtons')

// Get all availible filters from meta
const allFilters = (document.querySelector('meta[name="filters"]').content).split(',').filter(Boolean)

// Get url params for filter
const getUrlFilter = () => {
	const {
		skip,
		limit,
		sort,
		filters
	} = (new Url(window.location.href, true)).query

	return {
		skip: skip || '',
		limit: limit || '',
		sort: sort || '',
		filters: filters || ''
	}
}

const getFiltredFromServer = async () => {
	try {
		const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		const {
			skip,
			limit,
			sort,
			filters
		} = getUrlFilter()
		const resp = await fetch(`/screener/filter?limit=${limit}&skip=${skip}&sort=${sort}&filters=${filters}`, {
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

const generatePagination = (totalItems, pageSize = 25, skip = 0) => {
	const thisPage = Math.ceil(skip/pageSize) + 1
	const {pages, currentPage, totalPages} = paginate(totalItems, thisPage, pageSize)
	// Clear before initiate
	paginationList.innerHTML = ''
	controlButtons.innerHTML = ''

	// Create control buttons //
	const prevIcon = '<span class="icon"><ion-icon name="chevron-back-outline" size="large"></ion-icon></span>'
	const nextIcon = '<span class="icon"><ion-icon name="chevron-forward-outline" size="large"></ion-icon></span>'
	// Prev button
	if(thisPage !== 1) {
		controlButtons.innerHTML += `<a class="button pagination-previous" id="prevButton">${prevIcon}</a>`
	} else {
		controlButtons.innerHTML += `<a class="button pagination-previous" disabled id="prevButton">${prevIcon}</a>`
	}
	// Next button
	if(thisPage !== totalPages) {
		controlButtons.innerHTML += `<a class="button pagination-next" id="nextButton">${nextIcon}</a>`
	} else {
		controlButtons.innerHTML += `<a class="button pagination-next" disabled id="nextButton">${nextIcon}</a>`
	}

	// create link for start page
	if(pages[0] !== 1) {
		paginationList.innerHTML += '<li><a class="pagination-link" aria-label="Goto page 1">1</a></li>' 
		paginationList.innerHTML += pages[0] !== 2 ? '<li><span class="pagination-ellipsis">&hellip;</span></li>': ''
	}

	// create links to pages
	for (const page of pages) {
		paginationList.innerHTML += `<li><a class="pagination-link ${page === currentPage ? 'is-current': ''}" aria-label="Goto page ${page}">${page}</a></li>`
	}

	// create link for end page
	if(pages.slice(-1)[0] < totalPages) {
		paginationList.innerHTML += pages.slice(-1)[0] !== totalPages - 1 ? '<li><span class="pagination-ellipsis">&hellip;</span></li>' : ''
		paginationList.innerHTML += `<li><a class="pagination-link" aria-label="Goto page ${totalPages}">${totalPages}</a></li>`
	}
}

const generateScreenerTable = async () => {
	screener.innerHTML = ''
	const result = await getFiltredFromServer()
	totalStocks.textContent = result.count
	const {skip} = getUrlFilter()
	generatePagination(result.count, result.stocks.length, skip)

	if (result.count > 0) {
		for (const stock of result.stocks) {
			const row = screener.insertRow()
			row.insertCell(0).innerHTML = `<a href="/quote/${stock.ticker}">${stock.ticker}</a>`
			// today
			row.insertCell(1).innerHTML = stock.totalVolLast.toFixed(0)
			row.insertCell(2).innerHTML = stock.shortVolRatioLast.toFixed(2)
			row.insertCell(3).innerHTML = stock.shortExemptVolRatioLast.toFixed(2)
			// 3 days
			row.insertCell(4).innerHTML = stock.totalVol5DAVG.toFixed(0)
			row.insertCell(5).innerHTML = stock.shortVolRatio5DAVG.toFixed(2)
			row.insertCell(6).innerHTML = stock.shortExemptVolRatio5DAVG.toFixed(2)
			// 20 days
			row.insertCell(7).innerHTML = stock.totalVol20DAVG.toFixed(0)
			row.insertCell(8).innerHTML = stock.shortVolRatio20DAVG.toFixed(2)
			row.insertCell(9).innerHTML = stock.shortExemptVolRatio20DAVG.toFixed(2)
		}
	}
}

// Reset button
document.getElementById('resetFilters').addEventListener('click', async () => {
	const windowUrl = new URLSearchParams(window.location.search)
	windowUrl.delete('filters')
	history.replaceState(null, null, '?' + windowUrl.toString())
	await generateScreenerTable()

	// uncheck all inputs
	for (const filter of allFilters) {
		document.getElementById(filter).checked = false
	}
})

window.onload = async () => {
	await generateScreenerTable()

	// Parse url string and mark checked filters
	const {
		filters
	} = getUrlFilter()
	if (filters) {
		const fls = filters.split(',')
		for (const filter of fls) {
			document.getElementById(filter).checked = true
		}
	}

	// Set event listeners for each input
	for (const filter of allFilters) {
		document.getElementById(filter).addEventListener('change', async (event) => {
			const windowUrl = new URLSearchParams(window.location.search)
			const fls = windowUrl.get('filters')
			if (event.currentTarget.checked) {
				windowUrl.set('filters', `${fls ? fls + ',': ''}${filter}`)
				history.replaceState(null, null, '?' + windowUrl.toString())
			} else {
				const regex = new RegExp(`(${filter},|,${filter}|${filter})`)
				windowUrl.set('filters', fls.replace(regex, ''))
				history.replaceState(null, null, '?' + windowUrl.toString())
			}

			// Regenerate table after each filter change
			await generateScreenerTable()
		})
	}
}