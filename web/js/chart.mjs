import {
	createChart
} from 'lightweight-charts'
import resizeDetector from 'element-resize-detector'
import Legend from './Legend.mjs'

// Define chart properties
const chartPercent = createChart(document.getElementById('chartPercent'), {
	width: 800,
	height: 400,
	rightPriceScale: {
		scaleMargins: {
			top: 0.1,
			bottom: 0.1,
		},
		borderColor: 'rgba(197, 203, 206, 0.4)'
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

const chartVolume = createChart(document.getElementById('chartVolume'), {
	width: 800,
	height: 400,
	rightPriceScale: {
		scaleMargins: {
			top: 0.1,
			bottom: 0.1,
		},
		borderColor: 'rgba(197, 203, 206, 0.4)'
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

// Chart series for ratios (percentage format)
const series_shortVolumeRatio = chartPercent.addAreaSeries({
	topColor: 'rgba(38,198,218, 0.56)',
	bottomColor: 'rgba(38,198,218, 0.04)',
	lineColor: 'rgba(38,198,218, 1)',
	lineWidth: 2,
	priceFormat: {
		type: 'percent',
	},
})

const series_shortExemptVolumeRatio = chartPercent.addAreaSeries({
	topColor: 'rgba(233, 16, 169, 0.35)',
	bottomColor: 'rgba(233, 16, 169, 0)',
	lineColor: 'rgba(233, 16, 169, 1)',
	lineWidth: 2,
	priceFormat: {
		type: 'percent',
	},
})

const series_volumeHistogram = chartPercent.addHistogramSeries({
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

// Chart series with numbers (pure volume)
const series_shortVolume = chartVolume.addAreaSeries({
	topColor: 'rgba(38,198,218, 0.56)',
	bottomColor: 'rgba(38,198,218, 0.04)',
	lineColor: 'rgba(38,198,218, 1)',
	lineWidth: 2,
	priceFormat: {
		type: 'volume',
	},
})

const series_shortExemptVolume = chartVolume.addAreaSeries({
	topColor: 'rgba(233, 16, 169, 0.35)',
	bottomColor: 'rgba(233, 16, 169, 0)',
	lineColor: 'rgba(233, 16, 169, 1)',
	lineWidth: 2,
	priceFormat: {
		type: 'volume',
	},
})

const series_volume = chartVolume.addAreaSeries({
	topColor: 'rgba(233, 16, 169, 0.35)',
	bottomColor: 'rgba(233, 16, 169, 0)',
	lineColor: 'rgba(233, 16, 169, 1)',
	lineWidth: 2,
	priceFormat: {
		type: 'volume',
	},
})

// Resize charts
const resizer = resizeDetector({
	strategy: 'scroll'
})

resizer.listenTo(document.getElementById('chartPercent'), function (element) {
	chartPercent.applyOptions({
		width: element.offsetWidth,
		height: element.offsetHeight
	})
})

resizer.listenTo(document.getElementById('chartVolume'), function (element) {
	chartVolume.applyOptions({
		width: element.offsetWidth,
		height: element.offsetHeight
	})
})

// Legend ratio
const legend_shortVolumeRatio = new Legend('Short Volume Ratio', 'rgba(38,198,218, 1)', 'legend_shortVolumeRatio', 'legendRatio')
const legend_shortExemptVolumeRatio = new Legend('Short Exempt Volume Ratio', 'rgba(233, 16, 169, 1)', 'legend_shortExemptVolumeRatio', 'legendRatio')
const legend_volumeHist = new Legend('Volume', 'rgba(38,198,218, 1)', 'legend_volumeHist', 'legendRatio')

// Legend volume
const legend_shortVolume= new Legend('Short Volume', 'rgba(38,198,218, 1)', 'legend_shortVolume', 'legendVolume')
const legend_shortExemptVolume = new Legend('Short Exempt Volume', 'rgba(233, 16, 169, 1)', 'legend_shortExemptVolume', 'legendVolume')
const legend_volume = new Legend('Volume', 'rgba(38,198,218, 1)', 'legend_volume', 'legendVolume')

chartPercent.subscribeCrosshairMove((param) => {
	legend_shortVolumeRatio.setLegendText(param.seriesPrices.get(series_shortVolumeRatio) || 0)
	legend_shortExemptVolumeRatio.setLegendText(param.seriesPrices.get(series_shortExemptVolumeRatio) || 0)
	legend_volumeHist.setLegendText(param.seriesPrices.get(series_volumeHistogram) || 0)
})

chartVolume.subscribeCrosshairMove((param) => {
	legend_shortVolume.setLegendText(param.seriesPrices.get(series_shortVolume) || 0)
	legend_shortExemptVolume.setLegendText(param.seriesPrices.get(series_shortExemptVolume) || 0)
	legend_volume.setLegendText(param.seriesPrices.get(series_volume) || 0)
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

		const data_shortVolumeRatio = []
		const data_shortExemptVolumeRatio = []
		const data_volumeHist = []
		const data_volume = []
		const data_shortVolume = []
		const data_shortExemptVolume = []

		// Prepare data
		for (const el of response.volume) {
			data_shortVolumeRatio.push({
				time: el.date,
				value: (el.shortVolume / el.totalVolume * 100).toFixed(2)
			})
			data_shortExemptVolumeRatio.push({
				time: el.date,
				value: (el.shortExemptVolume / el.shortVolume * 100).toFixed(2)
			})
			data_volumeHist.push({
				time: el.date,
				value: el.totalVolume,
				color: el.shortVolume < el.totalVolume / 2 ? 'rgba(0, 150, 136, 0.8)' : 'rgba(255,82,82, 0.8)'
			})
			data_volume.push({
				time: el.date,
				value: el.totalVolume
			})
			data_shortVolume.push({
				time: el.date,
				value: el.shortVolume
			})
			data_shortExemptVolume.push({
				time: el.date,
				value: el.shortExemptVolume
			})
		}

		// Load data
		series_shortVolumeRatio.setData(data_shortVolumeRatio)
		series_shortExemptVolumeRatio.setData(data_shortExemptVolumeRatio)
		series_volumeHistogram.setData(data_volumeHist)
		series_volume.setData(data_volume)
		series_shortVolume.setData(data_shortVolume)
		series_shortExemptVolume.setData(data_shortExemptVolume)

		// Update chart watermark
		const watermark = `TightShorts.ru, ${ticker}`
		chartPercent.applyOptions({
			watermark: {
				text: watermark,
			},
		})
		chartVolume.applyOptions({
			watermark: {
				text: watermark,
			},
		})
	} catch (error) {
		console.log(error)
	}
})

// Fill all space
chartPercent.timeScale().fitContent()
chartVolume.timeScale().fitContent()