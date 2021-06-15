import {
    getData
} from './getData.mjs'

window.onload = async function () {
    const metaTicker = document.querySelector('meta[name="ticker"]').getAttribute('content')
    document.getElementById('input_ticker').value = metaTicker !== 'undefined' ? metaTicker : ''
    await getData(metaTicker !== 'undefined' ? metaTicker : 'SPY')
}