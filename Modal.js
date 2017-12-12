const w = window.innerWidth,h = window.innerHeight
class Modal {
    constructor(text) {
        this.text = text
        this.maxY = h/2-h/6
    }
    createDom() {
        this.div = document.createElement('div')
        this.div.style.width = w/3
        this.div.style.height = h/3
        this.div.style.position = 'absolute'
        this.div.style.left = w/2 - w/6
        this.div.style.top = h - h/6
        this.div.style.background = '#EEEEEE'
        this.div.style.borderRadius = Math.min(w,h)/12
        this.div.innerHTML = this.text
    }
    addToParent() {
        document.body.appendChild(this.div)
    }
}
