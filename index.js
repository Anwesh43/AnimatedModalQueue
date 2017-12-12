const modal = new Modal("hello world")
modal.createDom()
modal.addToParent()
class ModalQueue {
    constructor() {
        this.worker = new Worker('webworker.js')
        this.modals = []
    }
    showOrHideModals() {
        this.worker.onmessage = (tag) => {
            if(tag === "show") {
                this.modals[0].addToParent()
            }
            if(tag == "hide") {
                this.modals[0].removeFromParent(()=>{
                    this.modals.splice(0,1)
                })

            }
        }
    }
    addModal(text,color,show,hide) {
        this.modals.push(new Modal(text,color))
        this.worker.postMessage({show,hide})
    }
}
