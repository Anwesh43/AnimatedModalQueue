const w = window.innerWidth,h = window.innerHeight
class Modal {
    constructor(text) {
        this.text = text
        this.maxY = h/2-h/6
        this.animator = new ModalAnimator(this)
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
        this.animator.startAnimation()
    }
}
class ModalAnimator {
    constructor(modal) {
        this.state = new ModalState()
        this.animated = false
        this.y = parseInt(modal.div.style.top)
        this.oy = this.y
        this.destY = modal.maxY
    }
    startAnimation() {
        if(!this.animated) {
            this.animated = true
            this.state.startUpdating()
            const interval = setInterval(()=>{
                this.state.update(()=>{
                    this.y = this.oy + (this.destY-this.y)*scale
                })
            },50)
        }
    }
}
class ModalState {
    constructor() {
        this.scale = 0
        this.dir = 0
    }
    update(cb) {
        this.scale += this.dir*0.1
        cb(this.scale)
    }
    startUpdating() {
        this.dir = 1-2*this.scale
    }

}
