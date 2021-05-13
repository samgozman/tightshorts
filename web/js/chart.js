import {
	createChart
} from 'lightweight-charts'
import resizeDetector from 'element-resize-detector'

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

areaSeries.setData([{
		time: '2018-10-19',
		value: 219.31
	},
	{
		time: '2018-10-22',
		value: 220.65
	},
	{
		time: '2018-10-23',
		value: 222.73
	},
	{
		time: '2018-10-24',
		value: 215.09
	},
	{
		time: '2018-10-25',
		value: 219.8
	},
	{
		time: '2018-10-26',
		value: 216.3
	},
	{
		time: '2018-10-29',
		value: 212.24
	},
	{
		time: '2018-10-30',
		value: 213.3
	},
	{
		time: '2018-10-31',
		value: 218.86
	},
	{
		time: '2018-11-01',
		value: 222.22
	},
	{
		time: '2018-11-02',
		value: 207.48
	},
	{
		time: '2018-11-05',
		value: 201.59
	},
	{
		time: '2018-11-06',
		value: 203.77
	},
	{
		time: '2018-11-07',
		value: 209.95
	},
	{
		time: '2018-11-08',
		value: 208.49
	},
	{
		time: '2018-11-09',
		value: 204.47
	},
	{
		time: '2018-11-12',
		value: 194.17
	},
	{
		time: '2018-11-13',
		value: 192.23
	},
	{
		time: '2018-11-14',
		value: 186.8
	},
	{
		time: '2018-11-15',
		value: 191.41
	},
	{
		time: '2018-11-16',
		value: 193.53
	},
	{
		time: '2018-11-19',
		value: 185.86
	},
	{
		time: '2018-11-20',
		value: 176.98
	},
	{
		time: '2018-11-21',
		value: 176.78
	},
	{
		time: '2018-11-23',
		value: 172.29
	},
	{
		time: '2018-11-26',
		value: 174.62
	},
	{
		time: '2018-11-27',
		value: 174.24
	},
	{
		time: '2018-11-28',
		value: 180.94
	},
	{
		time: '2018-11-29',
		value: 179.55
	},
	{
		time: '2018-11-30',
		value: 178.58
	},
	{
		time: '2018-12-03',
		value: 184.82
	},
	{
		time: '2018-12-04',
		value: 176.69
	},
	{
		time: '2018-12-06',
		value: 174.72
	},
	{
		time: '2018-12-07',
		value: 168.49
	},
	{
		time: '2018-12-10',
		value: 169.6
	},
	{
		time: '2018-12-11',
		value: 168.63
	},
	{
		time: '2018-12-12',
		value: 169.1
	},
	{
		time: '2018-12-13',
		value: 170.95
	},
	{
		time: '2018-12-14',
		value: 165.48
	},
	{
		time: '2018-12-17',
		value: 163.94
	},
	{
		time: '2018-12-18',
		value: 166.07
	},
	{
		time: '2018-12-19',
		value: 160.89
	},
	{
		time: '2018-12-20',
		value: 156.83
	},
	{
		time: '2018-12-21',
		value: 150.73
	},
	{
		time: '2018-12-24',
		value: 146.83
	},
	{
		time: '2018-12-26',
		value: 157.17
	},
	{
		time: '2018-12-27',
		value: 156.15
	},
	{
		time: '2018-12-28',
		value: 156.23
	},
	{
		time: '2018-12-31',
		value: 157.74
	},
	{
		time: '2019-01-02',
		value: 157.92
	},
	{
		time: '2019-01-03',
		value: 142.19
	},
	{
		time: '2019-01-04',
		value: 148.26
	},
	{
		time: '2019-01-07',
		value: 147.93
	},
	{
		time: '2019-01-08',
		value: 150.75
	},
	{
		time: '2019-01-09',
		value: 153.31
	},
	{
		time: '2019-01-10',
		value: 153.8
	},
	{
		time: '2019-01-11',
		value: 152.29
	},
	{
		time: '2019-01-14',
		value: 150
	},
	{
		time: '2019-01-15',
		value: 153.07
	},
	{
		time: '2019-01-16',
		value: 154.94
	},
	{
		time: '2019-01-17',
		value: 155.86
	},
	{
		time: '2019-01-18',
		value: 156.82
	},
	{
		time: '2019-01-22',
		value: 153.3
	},
	{
		time: '2019-01-23',
		value: 153.92
	},
	{
		time: '2019-01-24',
		value: 152.7
	},
	{
		time: '2019-01-25',
		value: 157.76
	},
	{
		time: '2019-01-28',
		value: 156.3
	},
	{
		time: '2019-01-29',
		value: 154.68
	},
	{
		time: '2019-01-30',
		value: 165.25
	},
	{
		time: '2019-01-31',
		value: 166.44
	},
	{
		time: '2019-02-01',
		value: 166.52
	},
	{
		time: '2019-02-04',
		value: 171.25
	},
	{
		time: '2019-02-05',
		value: 174.18
	},
	{
		time: '2019-02-06',
		value: 174.24
	},
	{
		time: '2019-02-07',
		value: 170.94
	},
	{
		time: '2019-02-08',
		value: 170.41
	},
	{
		time: '2019-02-11',
		value: 169.43
	},
	{
		time: '2019-02-12',
		value: 170.89
	},
	{
		time: '2019-02-13',
		value: 170.18
	},
	{
		time: '2019-02-14',
		value: 170.8
	},
	{
		time: '2019-02-15',
		value: 170.42
	},
	{
		time: '2019-02-19',
		value: 170.93
	},
	{
		time: '2019-02-20',
		value: 172.03
	},
	{
		time: '2019-02-21',
		value: 171.06
	},
	{
		time: '2019-02-22',
		value: 172.97
	},
	{
		time: '2019-02-25',
		value: 174.23
	},
	{
		time: '2019-02-26',
		value: 174.33
	},
	{
		time: '2019-02-27',
		value: 174.87
	},
	{
		time: '2019-02-28',
		value: 173.15
	},
	{
		time: '2019-03-01',
		value: 174.97
	},
	{
		time: '2019-03-04',
		value: 175.85
	},
	{
		time: '2019-03-05',
		value: 175.53
	},
	{
		time: '2019-03-06',
		value: 174.52
	},
	{
		time: '2019-03-07',
		value: 172.5
	},
	{
		time: '2019-03-08',
		value: 172.91
	},
	{
		time: '2019-03-11',
		value: 178.9
	},
	{
		time: '2019-03-12',
		value: 180.91
	},
	{
		time: '2019-03-13',
		value: 181.71
	},
	{
		time: '2019-03-14',
		value: 183.73
	},
	{
		time: '2019-03-15',
		value: 186.12
	},
	{
		time: '2019-03-18',
		value: 188.02
	},
	{
		time: '2019-03-19',
		value: 186.53
	},
	{
		time: '2019-03-20',
		value: 188.16
	},
	{
		time: '2019-03-21',
		value: 195.09
	},
	{
		time: '2019-03-22',
		value: 191.05
	},
	{
		time: '2019-03-25',
		value: 188.74
	},
	{
		time: '2019-03-26',
		value: 186.79
	},
	{
		time: '2019-03-27',
		value: 188.47
	},
	{
		time: '2019-03-28',
		value: 188.72
	},
	{
		time: '2019-03-29',
		value: 189.95
	},
	{
		time: '2019-04-01',
		value: 191.24
	},
	{
		time: '2019-04-02',
		value: 194.02
	},
	{
		time: '2019-04-03',
		value: 195.35
	},
	{
		time: '2019-04-04',
		value: 195.69
	},
	{
		time: '2019-04-05',
		value: 197
	},
	{
		time: '2019-04-08',
		value: 200.1
	},
	{
		time: '2019-04-09',
		value: 199.5
	},
	{
		time: '2019-04-10',
		value: 200.62
	},
	{
		time: '2019-04-11',
		value: 198.95
	},
	{
		time: '2019-04-12',
		value: 198.87
	},
	{
		time: '2019-04-15',
		value: 199.23
	},
	{
		time: '2019-04-16',
		value: 199.25
	},
	{
		time: '2019-04-17',
		value: 203.13
	},
	{
		time: '2019-04-18',
		value: 203.86
	},
	{
		time: '2019-04-22',
		value: 204.53
	},
	{
		time: '2019-04-23',
		value: 207.48
	},
	{
		time: '2019-04-24',
		value: 207.16
	},
	{
		time: '2019-04-25',
		value: 205.28
	},
	{
		time: '2019-04-26',
		value: 204.3
	},
	{
		time: '2019-04-29',
		value: 204.61
	},
	{
		time: '2019-04-30',
		value: 200.67
	},
	{
		time: '2019-05-01',
		value: 210.52
	},
	{
		time: '2019-05-02',
		value: 209.15
	},
	{
		time: '2019-05-03',
		value: 211.75
	},
	{
		time: '2019-05-06',
		value: 208.48
	},
	{
		time: '2019-05-07',
		value: 202.86
	},
	{
		time: '2019-05-08',
		value: 202.9
	},
	{
		time: '2019-05-09',
		value: 200.72
	},
	{
		time: '2019-05-10',
		value: 197.18
	},
	{
		time: '2019-05-13',
		value: 185.72
	},
	{
		time: '2019-05-14',
		value: 188.66
	},
	{
		time: '2019-05-15',
		value: 190.92
	},
	{
		time: '2019-05-16',
		value: 190.08
	},
	{
		time: '2019-05-17',
		value: 189
	},
	{
		time: '2019-05-20',
		value: 183.09
	},
	{
		time: '2019-05-21',
		value: 186.6
	},
	{
		time: '2019-05-22',
		value: 182.78
	},
	{
		time: '2019-05-23',
		value: 179.66
	},
	{
		time: '2019-05-24',
		value: 178.97
	},
	{
		time: '2019-05-28',
		value: 179.07
	},
])

extraSeries.setData([{
		time: '2018-10-19',
		value: 44
	},
	{
		time: '2018-10-22',
		value: 43.14
	},
	{
		time: '2018-10-23',
		value: 42.3
	},
	{
		time: '2018-10-24',
		value: 40.99
	},
	{
		time: '2018-10-25',
		value: 41.59
	},
	{
		time: '2018-10-26',
		value: 41.1
	},
	{
		time: '2018-10-29',
		value: 41.03
	},
	{
		time: '2018-10-30',
		value: 42.21
	},
	{
		time: '2018-10-31',
		value: 43.37
	},
	{
		time: '2018-11-01',
		value: 42.65
	},
	{
		time: '2018-11-02',
		value: 41.6
	},
	{
		time: '2018-11-05',
		value: 42.61
	},
	{
		time: '2018-11-06',
		value: 42.66
	},
	{
		time: '2018-11-07',
		value: 43.11
	},
	{
		time: '2018-11-08',
		value: 41.27
	},
	{
		time: '2018-11-09',
		value: 41.24
	},
	{
		time: '2018-11-12',
		value: 40.87
	},
	{
		time: '2018-11-13',
		value: 39.81
	},
	{
		time: '2018-11-14',
		value: 40.33
	},
	{
		time: '2018-11-15',
		value: 41.16
	},
	{
		time: '2018-11-16',
		value: 40.84
	},
	{
		time: '2018-11-19',
		value: 40.92
	},
	{
		time: '2018-11-20',
		value: 40.1
	},
	{
		time: '2018-11-21',
		value: 41.27
	},
	{
		time: '2018-11-23',
		value: 39.89
	},
	{
		time: '2018-11-26',
		value: 40.53
	},
	{
		time: '2018-11-27',
		value: 40.32
	},
	{
		time: '2018-11-28',
		value: 40.84
	},
	{
		time: '2018-11-29',
		value: 40.48
	},
	{
		time: '2018-11-30',
		value: 40.35
	},
	{
		time: '2018-12-03',
		value: 41.19
	},
	{
		time: '2018-12-04',
		value: 40.95
	},
	{
		time: '2018-12-06',
		value: 39.59
	},
	{
		time: '2018-12-07',
		value: 39.51
	},
	{
		time: '2018-12-10',
		value: 39.37
	},
	{
		time: '2018-12-11',
		value: 39.08
	},
	{
		time: '2018-12-12',
		value: 39.05
	},
	{
		time: '2018-12-13',
		value: 39.29
	},
	{
		time: '2018-12-14',
		value: 38.66
	},
	{
		time: '2018-12-17',
		value: 38.41
	},
	{
		time: '2018-12-18',
		value: 37.82
	},
	{
		time: '2018-12-19',
		value: 37.65
	},
	{
		time: '2018-12-20',
		value: 37.26
	},
	{
		time: '2018-12-21',
		value: 37.67
	},
	{
		time: '2018-12-24',
		value: 36.65
	},
	{
		time: '2018-12-26',
		value: 38.06
	},
	{
		time: '2018-12-27',
		value: 37.73
	},
	{
		time: '2018-12-28',
		value: 38.13
	},
	{
		time: '2018-12-31',
		value: 37.92
	},
	{
		time: '2019-01-02',
		value: 38.59
	},
	{
		time: '2019-01-03',
		value: 38.81
	},
	{
		time: '2019-01-04',
		value: 40.03
	},
	{
		time: '2019-01-07',
		value: 40.16
	},
	{
		time: '2019-01-08',
		value: 40.03
	},
	{
		time: '2019-01-09',
		value: 40.36
	},
	{
		time: '2019-01-10',
		value: 40.7
	},
	{
		time: '2019-01-11',
		value: 40.24
	},
	{
		time: '2019-01-14',
		value: 40.42
	},
	{
		time: '2019-01-15',
		value: 40.24
	},
	{
		time: '2019-01-16',
		value: 40.12
	},
	{
		time: '2019-01-17',
		value: 40.13
	},
	{
		time: '2019-01-18',
		value: 40.76
	},
	{
		time: '2019-01-22',
		value: 40.08
	},
	{
		time: '2019-01-23',
		value: 40.12
	},
	{
		time: '2019-01-24',
		value: 40.11
	},
	{
		time: '2019-01-25',
		value: 40.11
	},
	{
		time: '2019-01-28',
		value: 39.57
	},
	{
		time: '2019-01-29',
		value: 40.2
	},
	{
		time: '2019-01-30',
		value: 40.67
	},
	{
		time: '2019-01-31',
		value: 41.12
	},
	{
		time: '2019-02-01',
		value: 41.34
	},
	{
		time: '2019-02-04',
		value: 41.39
	},
	{
		time: '2019-02-05',
		value: 42.82
	},
	{
		time: '2019-02-06',
		value: 43.04
	},
	{
		time: '2019-02-07',
		value: 42.7
	},
	{
		time: '2019-02-08',
		value: 42.49
	},
	{
		time: '2019-02-11',
		value: 42.21
	},
	{
		time: '2019-02-12',
		value: 42.42
	},
	{
		time: '2019-02-13',
		value: 42.64
	},
	{
		time: '2019-02-14',
		value: 41.87
	},
	{
		time: '2019-02-15',
		value: 42.29
	},
	{
		time: '2019-02-19',
		value: 42.38
	},
	{
		time: '2019-02-20',
		value: 42.48
	},
	{
		time: '2019-02-21',
		value: 42.29
	},
	{
		time: '2019-02-22',
		value: 42.46
	},
	{
		time: '2019-02-25',
		value: 42.51
	},
	{
		time: '2019-02-26',
		value: 42.52
	},
	{
		time: '2019-02-27',
		value: 42.84
	},
	{
		time: '2019-02-28',
		value: 42.65
	},
	{
		time: '2019-03-01',
		value: 42.58
	},
	{
		time: '2019-03-04',
		value: 42.64
	},
	{
		time: '2019-03-05',
		value: 42.74
	},
	{
		time: '2019-03-06',
		value: 42.7
	},
	{
		time: '2019-03-07',
		value: 42.63
	},
	{
		time: '2019-03-08',
		value: 42.25
	},
	{
		time: '2019-03-11',
		value: 42.33
	},
	{
		time: '2019-03-12',
		value: 42.46
	},
	{
		time: '2019-03-13',
		value: 43.83
	},
	{
		time: '2019-03-14',
		value: 43.95
	},
	{
		time: '2019-03-15',
		value: 43.87
	},
	{
		time: '2019-03-18',
		value: 44.24
	},
	{
		time: '2019-03-19',
		value: 44.47
	},
	{
		time: '2019-03-20',
		value: 44.53
	},
	{
		time: '2019-03-21',
		value: 44.53
	},
	{
		time: '2019-03-22',
		value: 43.95
	},
	{
		time: '2019-03-25',
		value: 43.53
	},
	{
		time: '2019-03-26',
		value: 43.82
	},
	{
		time: '2019-03-27',
		value: 43.59
	},
	{
		time: '2019-03-28',
		value: 43.63
	},
	{
		time: '2019-03-29',
		value: 43.72
	},
	{
		time: '2019-04-01',
		value: 44.09
	},
	{
		time: '2019-04-02',
		value: 44.23
	},
	{
		time: '2019-04-03',
		value: 44.23
	},
	{
		time: '2019-04-04',
		value: 44.15
	},
	{
		time: '2019-04-05',
		value: 44.53
	},
	{
		time: '2019-04-08',
		value: 45.23
	},
	{
		time: '2019-04-09',
		value: 44.99
	},
	{
		time: '2019-04-10',
		value: 45.04
	},
	{
		time: '2019-04-11',
		value: 44.87
	},
	{
		time: '2019-04-12',
		value: 44.67
	},
	{
		time: '2019-04-15',
		value: 44.67
	},
	{
		time: '2019-04-16',
		value: 44.48
	},
	{
		time: '2019-04-17',
		value: 44.62
	},
	{
		time: '2019-04-18',
		value: 44.39
	},
	{
		time: '2019-04-22',
		value: 45.04
	},
	{
		time: '2019-04-23',
		value: 45.02
	},
	{
		time: '2019-04-24',
		value: 44.13
	},
	{
		time: '2019-04-25',
		value: 43.96
	},
	{
		time: '2019-04-26',
		value: 43.31
	},
	{
		time: '2019-04-29',
		value: 43.02
	},
	{
		time: '2019-04-30',
		value: 43.73
	},
	{
		time: '2019-05-01',
		value: 43.08
	},
	{
		time: '2019-05-02',
		value: 42.63
	},
	{
		time: '2019-05-03',
		value: 43.08
	},
	{
		time: '2019-05-06',
		value: 42.93
	},
	{
		time: '2019-05-07',
		value: 42.22
	},
	{
		time: '2019-05-08',
		value: 42.28
	},
	{
		time: '2019-05-09',
		value: 41.65
	},
	{
		time: '2019-05-10',
		value: 41.5
	},
	{
		time: '2019-05-13',
		value: 41.23
	},
	{
		time: '2019-05-14',
		value: 41.55
	},
	{
		time: '2019-05-15',
		value: 41.77
	},
	{
		time: '2019-05-16',
		value: 42.28
	},
	{
		time: '2019-05-17',
		value: 42.34
	},
	{
		time: '2019-05-20',
		value: 42.58
	},
	{
		time: '2019-05-21',
		value: 42.75
	},
	{
		time: '2019-05-22',
		value: 42.34
	},
	{
		time: '2019-05-23',
		value: 41.34
	},
	{
		time: '2019-05-24',
		value: 41.76
	},
	{
		time: '2019-05-28',
		value: 41.625
	},
])

volumeSeries.setData([{
		time: '2018-10-19',
		value: 19103293.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-10-22',
		value: 21737523.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-10-23',
		value: 29328713.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-10-24',
		value: 37435638.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-10-25',
		value: 25269995.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-10-26',
		value: 24973311.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-10-29',
		value: 22103692.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-10-30',
		value: 25231199.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-10-31',
		value: 24214427.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-11-01',
		value: 22533201.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-11-02',
		value: 14734412.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-05',
		value: 12733842.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-06',
		value: 12371207.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-07',
		value: 14891287.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-08',
		value: 12482392.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-09',
		value: 17365762.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-12',
		value: 13236769.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-13',
		value: 13047907.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-11-14',
		value: 18288710.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-15',
		value: 17147123.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-16',
		value: 19470986.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-19',
		value: 18405731.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-20',
		value: 22028957.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-11-21',
		value: 18482233.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-11-23',
		value: 7009050.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-11-26',
		value: 12308876.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-27',
		value: 14118867.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-11-28',
		value: 18662989.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-11-29',
		value: 14763658.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-11-30',
		value: 31142818.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-12-03',
		value: 27795428.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-04',
		value: 21727411.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-06',
		value: 26880429.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-07',
		value: 16948126.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-10',
		value: 16603356.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-12-11',
		value: 14991438.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-12-12',
		value: 18892182.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-13',
		value: 15454706.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-14',
		value: 13960870.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-17',
		value: 18902523.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-18',
		value: 18895777.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-19',
		value: 20968473.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-12-20',
		value: 26897008.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-21',
		value: 55413082.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-24',
		value: 15077207.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2018-12-26',
		value: 17970539.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-12-27',
		value: 17530977.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-12-28',
		value: 14771641.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2018-12-31',
		value: 15331758.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-02',
		value: 13969691.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-01-03',
		value: 19245411.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-04',
		value: 17035848.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-07',
		value: 16348982.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-08',
		value: 21425008.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-09',
		value: 18136000.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-01-10',
		value: 14259910.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-11',
		value: 15801548.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-14',
		value: 11342293.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-15',
		value: 10074386.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-16',
		value: 13411691.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-01-17',
		value: 15223854.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-01-18',
		value: 16802516.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-22',
		value: 18284771.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-01-23',
		value: 15109007.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-24',
		value: 12494109.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-01-25',
		value: 17806822.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-01-28',
		value: 25955718.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-01-29',
		value: 33789235.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-01-30',
		value: 27260036.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-01-31',
		value: 28585447.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-01',
		value: 13778392.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-02-04',
		value: 15818901.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-02-05',
		value: 14124794.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-06',
		value: 11391442.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-02-07',
		value: 12436168.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-02-08',
		value: 12011657.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-11',
		value: 9802798.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-12',
		value: 11227550.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-13',
		value: 11884803.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-14',
		value: 11190094.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-02-15',
		value: 15719416.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-19',
		value: 12272877.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-20',
		value: 11379006.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-21',
		value: 14680547.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-22',
		value: 12534431.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-25',
		value: 15051182.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-02-26',
		value: 12005571.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-02-27',
		value: 8962776.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-02-28',
		value: 15742971.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-01',
		value: 10942737.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-04',
		value: 13674737.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-03-05',
		value: 15749545.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-03-06',
		value: 13935530.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-03-07',
		value: 12644171.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-08',
		value: 10646710.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-11',
		value: 13627431.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-12',
		value: 12812980.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-03-13',
		value: 14168350.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-14',
		value: 12148349.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-15',
		value: 23715337.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-18',
		value: 12168133.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-03-19',
		value: 13462686.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-03-20',
		value: 11903104.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-21',
		value: 10920129.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-22',
		value: 25125385.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-25',
		value: 15463411.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-26',
		value: 12316901.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-27',
		value: 13290298.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-03-28',
		value: 20547060.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-03-29',
		value: 17283871.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-01',
		value: 16331140.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-04-02',
		value: 11408146.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-04-03',
		value: 15491724.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-04',
		value: 8776028.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-05',
		value: 11497780.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-08',
		value: 11680538.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-09',
		value: 10414416.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-04-10',
		value: 8782061.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-11',
		value: 9219930.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-04-12',
		value: 10847504.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-15',
		value: 7741472.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-04-16',
		value: 10239261.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-17',
		value: 15498037.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-04-18',
		value: 13189013.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-22',
		value: 11950365.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-23',
		value: 23488682.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-04-24',
		value: 13227084.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-04-25',
		value: 17425466.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-04-26',
		value: 16329727.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-29',
		value: 13984965.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-04-30',
		value: 15469002.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-01',
		value: 11627436.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-05-02',
		value: 14435436.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-03',
		value: 9388228.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-06',
		value: 10066145.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-05-07',
		value: 12963827.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-05-08',
		value: 12086743.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-05-09',
		value: 14835326.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-10',
		value: 10707335.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-13',
		value: 13759350.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-05-14',
		value: 12776175.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-05-15',
		value: 10806379.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-16',
		value: 11695064.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-17',
		value: 14436662.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-20',
		value: 20910590.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-21',
		value: 14016315.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-22',
		value: 11487448.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-05-23',
		value: 11707083.00,
		color: 'rgba(255,82,82, 0.8)'
	},
	{
		time: '2019-05-24',
		value: 8755506.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
	{
		time: '2019-05-28',
		value: 3097125.00,
		color: 'rgba(0, 150, 136, 0.8)'
	},
])