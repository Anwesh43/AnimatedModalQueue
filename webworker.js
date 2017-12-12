class Timer {
    constructor() {
        this.queue = []
        this.j = 0
        this.waiting = false
    }
    add(timerObj) {
        this.queue.push({tag:'show',time:timerObj.show})
        this.queue.push({tag:'hide',time:timerObj.hide})
        this.execute()
    }
    execute() {
      console.log(this.queue)
      if(this.queue.length > 0) {
          const obj = this.queue[0]
          this.sleep(obj.time,obj.tag)
      }
    }
    sleep(time,tag) {
        if(!this.waiting) {
            this.waiting = true
            console.log(this.waiting)
            setTimeout(()=>{
                postMessage(tag)
                this.queue.splice(0,1)
                this.waiting = false
                this.execute()
            },time)
        }
    }
}
const timer = new Timer()
self.onmessage = (timerObj)=>{
    console.log(timerObj.data)
    timer.add(timerObj.data)
}
