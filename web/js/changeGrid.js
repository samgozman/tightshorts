const grid_button = document.getElementById('change-grid')
const mixlines = document.getElementsByClassName('mixline')

const changeGrid = (grid) => {
    if (grid === 'full') {
        grid_button.classList.add('active')

        for (const element of mixlines) {
            element.classList.remove('is-half')
            element.classList.add('is-full')
        }
    }

    if (grid === 'half') {
        grid_button.classList.remove('active')

        for (const element of mixlines) {
            element.classList.remove('is-full')
            element.classList.add('is-half')
        }
    }
}

grid_button.addEventListener('click', () => {
    let grid = localStorage.getItem('grid')
    if (grid === 'full') localStorage.setItem('grid', 'half')
    if (grid === 'half') localStorage.setItem('grid', 'full')
    if (!grid) localStorage.setItem('grid', 'full')

    changeGrid(localStorage.getItem('grid'))
})

window.addEventListener('load', function(){
    const grid = localStorage.getItem('grid')
    changeGrid(grid)
})