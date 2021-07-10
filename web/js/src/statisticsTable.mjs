import round from './round.mjs'

const table_statistic = document.getElementById('table-statistic')

const createStatisticTableRow = (title, value) => {
    let row = table_statistic.insertRow()
    row.insertCell(0).innerHTML = title
    row.insertCell(1).innerHTML = value
}

const getAvgShortVolume = (response, days = 5) => {
    const volume = response.volume
    // Avg value
    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length

    // Array of N total volumes
    const totalVolume = volume.slice(0, days).map(el => {
        return el.totalVolume
    })

    // Array of N short volumes
    const shortVolume = volume.slice(0, days).map(el => {
        return el.shortVolume
    })

    return round(average(shortVolume) / average(totalVolume) * 100).toFixed(2)
}

const generateStatisticTable = (response) => {
    // Clear before use
    table_statistic.innerHTML = ''

    createStatisticTableRow('Last 5 days short volume', getAvgShortVolume(response, 5) + '%')
    createStatisticTableRow('Last 10 days short volume', getAvgShortVolume(response, 10) + '%')
    createStatisticTableRow('Last 20 days short volume', getAvgShortVolume(response, 20) + '%')
    createStatisticTableRow('Last 40 days short volume', getAvgShortVolume(response, 40) + '%')
}

export default generateStatisticTable