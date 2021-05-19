// Gen table
const table_tbody = document.getElementById('table-body')
const array_for_csv = [
    ['Date', 'Short Volume', 'Short Volume Ratio (%)', 'Short Exempt Volume', 'Short Exempt Volume Ratio (%)', 'Total Volume']
]

const createTableRow = (table, date, sv, svr, sev, sevr, vol) => {
    let row = table.insertRow()
    row.insertCell(0).innerHTML = date
    row.insertCell(1).innerHTML = sv
    row.insertCell(2).innerHTML = svr
    row.insertCell(3).innerHTML = sev
    row.insertCell(4).innerHTML = sevr
    row.insertCell(5).innerHTML = vol
}

const createCSVfile = (ticker) => {
    let csvContent = 'data:text/csv;charset=utf-8,' + array_for_csv.map(e => e.join(',')).join('\n')
    const link = document.getElementById('csv-file')
    link.setAttribute('href', encodeURI(csvContent))
    link.setAttribute('download', ticker + '_short_volume.csv')
}

export const generateTable = (response) => {
    // Clear CSV array from prev
    array_for_csv.length = 1
    const reversed_array = response.volume.reverse()
    for (const [i, el] of reversed_array.entries()) {
        const date = el.date.replace(/T(.*)/g, '')
        const svr = (el.shortVolume / el.totalVolume * 100).toFixed(2)
        const sevr = (el.shortExemptVolume / el.totalVolume * 100).toFixed(2)
        if (i < 30) createTableRow(table_tbody, date, el.shortVolume, svr, el.shortExemptVolume, sevr, el.totalVolume)
        array_for_csv.push([date, el.shortVolume, svr, el.shortExemptVolume, sevr, el.totalVolume])
    }
    createCSVfile(response.ticker)
}

export const clearTable = () => {
    table_tbody.innerHTML = ''
}