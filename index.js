// const modal = new Modal("hello world")
// modal.createDom()
// modal.addToParent()
class ModalQueue {
    constructor() {
        this.worker = new Worker('webworker.js')
        this.modals = []
    }
    showOrHideModals() {
        this.worker.onmessage = (obj) => {
            const tag = obj.data
            console.log(tag)
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
        const modal = new Modal(text,color)
        modal.createDom()
        this.modals.push(modal)
        console.log(modal)
        this.worker.postMessage({show:show*1000,hide:hide*1000})
    }
}
const modalQueue = new ModalQueue()
modalQueue.showOrHideModals()
modalQueue.addModal("Hello World","#7C4DFF",2,3)
modalQueue.addModal("Great work","#EEEEEE",1,2)
modalQueue.addModal("More work","#673AB7",3,4)
modalQueue.addModal("Some work","#FF5722",4,3)
