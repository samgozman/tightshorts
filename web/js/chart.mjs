import {
	createChart
} from 'lightweight-charts'
import resizeDetector from 'element-resize-detector'
import Legend from './Legend.mjs'

// Define chart properties
var chart = createChart(document.getElementById('chart'), {
	width: 800,
	height: 400,
	timeScale: {
		lockVisibleTimeRangeOnResize: true
	},
	rightPriceScale: {
		scaleMargins: {
			top: 0.1,
			bottom: 0.1,
		},
		borderColor: 'rgba(197, 203, 206, 0.4)',
	},
	watermark: {
		visible: true,
		fontSize: 24,
		horzAlign: 'center',
		vertAlign: 'center',
		color: 'rgba(171, 71, 188, 0.5)',
		text: 'TightShorts.ru, stock',
	},
	layout: {
		backgroundColor: '#ffffff',
		textColor: '#333',
	},
	grid: {
		horzLines: {
			color: '#eee',
		},
		vertLines: {
			color: '#ffffff',
		},
	},
})

var areaSeries = chart.addAreaSeries({
	topColor: 'rgba(38,198,218, 0.56)',
	bottomColor: 'rgba(38,198,218, 0.04)',
	lineColor: 'rgba(38,198,218, 1)',
	lineWidth: 2,
	priceFormat: {
		type: 'percent',
	},
})

var extraSeries = chart.addAreaSeries({
	topColor: 'rgba(233, 16, 169, 0.35)',
	bottomColor: 'rgba(233, 16, 169, 0)',
	lineColor: 'rgba(233, 16, 169, 1)',
	lineWidth: 2,
	priceFormat: {
		type: 'percent',
	},
})

var volumeSeries = chart.addHistogramSeries({
	color: '#26a69a',
	priceFormat: {
		type: 'volume',
	},
	priceScaleId: '',
	scaleMargins: {
		top: 0.8,
		bottom: 0,
	},
})

// Resize charts
const resizer = resizeDetector({
	strategy: 'scroll'
})

resizer.listenTo(document.getElementById('chart'), function (element) {
	chart.applyOptions({
		width: element.offsetWidth,
		height: element.offsetHeight
	})
})

// Legend
const legend_short_volume = new Legend('Short Volume Ratio', 'rgba(38,198,218, 1)', 'legend_short_volume', 'legend')
const legend_short_exempt_volume = new Legend('Short Exempt Volume Ratio', 'rgba(233, 16, 169, 1)', 'legend_short_exempt_volume', 'legend')
const legend_volume = new Legend('Volume', 'rgba(38,198,218, 1)', 'legend_volume', 'legend')

chart.subscribeCrosshairMove((param) => {
	legend_short_volume.setLegendText(param.seriesPrices.get(areaSeries) || 0)
	legend_short_exempt_volume.setLegendText(param.seriesPrices.get(extraSeries) || 0)
	legend_volume.setLegendText(param.seriesPrices.get(volumeSeries) || 0)
})

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
	try {
		// Fetch data
		const ticker = document.getElementById('input_ticker').value.toUpperCase()
		// const _csrf = document.getElementById('_csrf').value
		const response = await getResponse(ticker)

		const data_short_volume = []
		const data_short_exempt_volume = []
		const data_volume = []

		// Prepare data
		for (const el of response.volume) {
			data_short_volume.push({
				time: el.date,
				value: (el.shortVolume / el.totalVolume * 100).toFixed(2)
			})
			data_short_exempt_volume.push({
				time: el.date,
				value: (el.shortExemptVolume / el.shortVolume * 100).toFixed(2)
			})
			data_volume.push({
				time: el.date,
				value: el.totalVolume,
				color: el.shortVolume < el.totalVolume / 2 ? 'rgba(0, 150, 136, 0.8)' : 'rgba(255,82,82, 0.8)'
			})
		}

		// Load data
		areaSeries.setData(data_short_volume)
		extraSeries.setData(data_short_exempt_volume)
		volumeSeries.setData(data_volume)

		// Update chart watermark
		chart.applyOptions({
			watermark: {
				text: `TightShorts.ru, ${ticker}`,
			},
		})
	} catch (error) {
		console.log(error)
	}
})