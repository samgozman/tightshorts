// Gen table
const table_tbody = document.getElementById('table-body')

const createTableRow = (table, data, sv, sev, vol) => {
    let row = table.insertRow()
    row.insertCell(0).innerHTML = data.replace(/T(.*)/g, '')
    row.insertCell(1).innerHTML = sv
    row.insertCell(2).innerHTML = sev
    row.insertCell(3).innerHTML = vol
}

export const generateTable = (response) => {
    const reversed_array = response.volume.reverse()
    for (const [i, el] of reversed_array.entries()) {
        if (i < 30) createTableRow(table_tbody, el.date, el.shortVolume, el.shortExemptVolume, el.totalVolume)
    }
}

export const clearTable = () => {
    table_tbody.innerHTML = ''
}