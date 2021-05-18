// Gen table
const table_tbody = document.getElementById('table-body')
const array_for_csv = [
    ['Date', 'Short Volume', 'Short Exempt Volume', 'Total Volume']
]

const createTableRow = (table, date, sv, sev, vol) => {
    let row = table.insertRow()
    row.insertCell(0).innerHTML = date
    row.insertCell(1).innerHTML = sv
    row.insertCell(2).innerHTML = sev
    row.insertCell(3).innerHTML = vol
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
        if (i < 30) createTableRow(table_tbody, date, el.shortVolume, el.shortExemptVolume, el.totalVolume)
        array_for_csv.push([date, el.shortVolume, el.shortExemptVolume, el.totalVolume])
    }
    createCSVfile(response.ticker)
}

export const clearTable = () => {
    table_tbody.innerHTML = ''
}