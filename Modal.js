const w = window.innerWidth,h = window.innerHeight
class Modal {
    constructor(text,color) {
        this.text = text
        this.maxY = h/2-h/4
        this.color = color
    }
    createDom() {
        this.div = document.createElement('div')
        this.div.style.width = w/3
        this.div.style.height = h/2
        this.div.style.position = 'absolute'
        this.div.style.left = w/2 - w/6
        this.div.style.top = h+ h/2
        this.div.style.background = this.color || '#EEEEEE'
        this.div.style.borderRadius = `${Math.min(w,h)/25}px`
        this.div.style.fontSize = Math.min(w,h)/16
        this.div.style.textAlign = 'center'
        this.div.innerHTML = this.text
        this.animator = new ModalAnimator(this)
    }
    addToParent() {
        document.body.appendChild(this.div)
        this.animator.startAnimation()
    }
    setY(y) {
        this.div.style.top = y
    }
    removeFromParent(cb) {
        this.animator.startAnimation(()=>{
            document.body.removeChild(this.div)
            cb()
        })
    }
}
class ModalAnimator {
    constructor(modal) {
        this.state = new ModalState()
        this.animated = false
        this.y = parseInt(modal.div.style.top)
        this.oy = this.y
        this.destY = modal.maxY
        this.modal = modal
    }
    startAnimation(cb) {
        if(!this.animated) {
            this.animated = true
            this.state.startUpdating()
            const interval = setInterval(()=>{
                this.state.update((scale)=>{
                    this.y = this.oy + (this.destY-this.oy)*scale
                    this.modal.setY(this.y)
                })
                if(this.state.stopped()) {
                    clearInterval(interval)
                    this.animated = false
                    if(cb) {
                        cb()
                    }
                }
            },50)
        }
    }
}
class ModalState {
    constructor() {
        this.scale = 0
        this.dir = 0
        this.prevScale = 0
    }
    update(cb) {
        this.scale += this.dir*0.1
        cb(this.scale)
        if(Math.abs(this.prevScale-this.scale)>1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
        }
    }
    stopped() {
        return this.dir == 0
    }
    startUpdating() {
        this.dir = 1-2*this.scale
    }

}
