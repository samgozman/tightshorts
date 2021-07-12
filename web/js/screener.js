import Url from 'url-parse'
const screener = document.getElementById('screenerBody')

// Get all availible filters from meta
const allFilters = (document.querySelector('meta[name="filters"]').content).split(',').filter(Boolean)

const getFiltredFromServer = async () => {
	try {
		const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		const url = new Url(window.location.href, true)
		const {
			skip,
			limit,
			sort,
			filters
		} = url.query
		const resp = await fetch(`/screener/filter?limit=${limit || ''}&skip=${skip || ''}&sort=${sort || ''}&filters=${filters || ''}`, {
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

const generateScreenerTable = async () => {
	screener.innerHTML = ''
	const result = await getFiltredFromServer()
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
	} = (new Url(window.location.href, true)).query
	if(filters){
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