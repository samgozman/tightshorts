class Legend {
    constructor(title, color, id, parent_id) {
        this.title = title
        this.color = color
        this.id = id
        this.parent_id = parent_id
        this.body = document.createElement('div')
        this.body.classList.add('legend-item')
        this.body.id = id
    }

    setLegendText(val) {
        const element = document.getElementById(this.id)
        if(element) element.remove()
        this.body.innerHTML = `${this.title} <span style="color:${this.color}"> ${val}</span>`
        document.getElementById(this.parent_id).appendChild(this.body)
    }
}

export default Legend