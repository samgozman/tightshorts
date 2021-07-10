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

    setLegendText(val, sign, extra) {
        const element = document.getElementById(this.id)
        if (element) element.remove()
        const extraVal = extra ? `(${extra}%)` : ''
        const text = `${this.title} <span style="color:${this.color}"> ${val}${sign?sign:''} ${extraVal}</span>`
        this.body.innerHTML = text
        document.getElementById(this.parent_id).appendChild(this.body)
    }
}

export default Legend