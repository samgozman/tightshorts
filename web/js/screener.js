import Url from 'url-parse'
import {
	paginate
} from './src/paginate.mjs'

// Page elements
const screenerBody = document.getElementById('screenerBody')
const totalStocks = document.getElementById('totalStocks')
const paginationList = document.getElementById('paginationList')
const prevButton = document.getElementById('prevButton')
const nextButton = document.getElementById('nextButton')

// Get all availible filters from meta
const allFilters = (document.querySelector('meta[name="filters"]').content).split(',').filter(Boolean)

// Change skip value in url and update table
const changeSkip = async (skipValue, btn = undefined) => {
	// don't run if button is disabled
	if(btn && btn.hasAttribute('disabled')) return

	const windowUrl = new URLSearchParams(window.location.search)
	windowUrl.set('skip', skipValue >= 0 ? skipValue : 0)
	history.replaceState(null, null, '?' + windowUrl.toString())
	await generateScreenerTable()
}

// Format big numbers to K, like 10k
function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

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
	const thisPage = Math.ceil(skip / pageSize) + 1
	const {
		pages,
		currentPage,
		totalPages
	} = paginate(totalItems, thisPage, pageSize)

	// Clear before initiate
	paginationList.innerHTML = ''

	// Create control buttons //
	// Prev button
	if (thisPage === 1) {
		prevButton.setAttribute('disabled', 'disabled')
	} else {
		prevButton.removeAttribute('disabled')
	}
	
	// Next button
	if (thisPage === totalPages) {
		nextButton.setAttribute('disabled', 'disabled')
	} else {
		nextButton.removeAttribute('disabled')
	}

	// create link for start page
	if (pages[0] !== 1) {
		paginationList.innerHTML += '<li><a class="pagination-link" aria-label="Goto page 1">1</a></li>'
		paginationList.innerHTML += pages[0] !== 2 ? '<li><span class="pagination-ellipsis">&hellip;</span></li>' : ''
	}

	// create links to pages
	for (const page of pages) {
		paginationList.innerHTML += `<li><a class="pagination-link ${page === currentPage ? 'is-current': ''}" aria-label="Goto page ${page}">${page}</a></li>`
	}

	// create link for end page
	if (pages.slice(-1)[0] < totalPages) {
		paginationList.innerHTML += pages.slice(-1)[0] !== totalPages - 1 ? '<li><span class="pagination-ellipsis">&hellip;</span></li>' : ''
		paginationList.innerHTML += `<li><a class="pagination-link" aria-label="Goto page ${totalPages}">${totalPages}</a></li>`
	}

	Array.from(document.getElementsByClassName('pagination-link')).forEach(async function (link) {
		const skipValue = (parseInt(link.textContent) - 1) * pageSize
		link.addEventListener('click', async () => await changeSkip(skipValue))
	})
}

const nextPrevListeners = async () => {
	prevButton.addEventListener('click', async function () {
		const {
			skip,
			limit
		} = getUrlFilter()
		const skipValue = (parseInt(skip) || 25) - (parseInt(limit) || 25)
		await changeSkip(skipValue, this)
	})

	nextButton.addEventListener('click', async function () {
		const {
			skip,
			limit
		} = getUrlFilter()
		const skipValue = (parseInt(skip) || 0) + (parseInt(limit) || 25)
		await changeSkip(skipValue, this)
	})
}

const generateScreenerTable = async () => {
	// Set section min-height to prevernt from flickering
	const mainSection = document.getElementById('main-section')
	mainSection.style = `min-height: ${mainSection.offsetHeight}px;`

	// Clear table
	screenerBody.innerHTML = ''

	const result = await getFiltredFromServer()
	totalStocks.textContent = result.count
	const {
		skip,
		limit
	} = getUrlFilter()

	if (result.count > 0) {
		for (const stock of result.stocks) {
			const row = screenerBody.insertRow()
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
				shortExemptVolRatio20DAVG
			} = stock
			row.insertCell(0).innerHTML = `<a href="/quote/${ticker}">${ticker}</a>`
			// today
			row.insertCell(1).innerHTML = totalVolLast ? kFormatter(totalVolLast) : 0
			row.insertCell(2).innerHTML = (shortVolRatioLast ? shortVolRatioLast.toFixed(2): 0) + '%'
			row.insertCell(3).innerHTML = (shortExemptVolRatioLast ? shortExemptVolRatioLast.toFixed(2): 0) + '%'
			// 3 days
			row.insertCell(4).innerHTML = totalVol5DAVG ? kFormatter(totalVol5DAVG) : 0
			row.insertCell(5).innerHTML = (shortVolRatio5DAVG ? shortVolRatio5DAVG.toFixed(2) : 0) + '%'
			row.insertCell(6).innerHTML = (shortExemptVolRatio5DAVG ? shortExemptVolRatio5DAVG.toFixed(2) : 0) + '%'
			// 20 days
			row.insertCell(7).innerHTML = totalVol20DAVG ? kFormatter(totalVol20DAVG) : 0
			row.insertCell(8).innerHTML = (shortVolRatio20DAVG ? shortVolRatio20DAVG.toFixed(2) : 0) + '%'
			row.insertCell(9).innerHTML = (shortExemptVolRatio20DAVG ? shortExemptVolRatio20DAVG.toFixed(2) : 0) + '%'
		}
	}

	generatePagination(result.count, limit || 25, skip)
}

// Reset button
document.getElementById('resetFilters').addEventListener('click', async () => {
	const windowUrl = new URLSearchParams(window.location.search)
	windowUrl.delete('filters')
	history.replaceState(null, null, '?' + windowUrl.toString())
	await changeSkip(0)
	await generateScreenerTable()

	// uncheck all inputs
	for (const filter of allFilters) {
		document.getElementById(filter).checked = false
	}
})

window.onload = async () => {
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

			await changeSkip(0)

			// Regenerate table after each filter change
			await generateScreenerTable()
		})
	}

	await generateScreenerTable()
	await nextPrevListeners()
}