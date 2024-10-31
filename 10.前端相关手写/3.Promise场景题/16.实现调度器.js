class Schedular {
    constructor(limit) {
        this.limit = limit
        this.queue = []
        this.run = new Set() // 存放正在执行的任务
    }

    add(time, value) {
        const mock = () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    console.log(value)
                    resolve(value)
                }, time)
            })

        this.queue.push(mock)
    }
    async taskStart() {
        for (let promise of this.queue) {
            if (this.run.size >= this.limit) {
                await Promise.race(this.run)
            }
            let task = promise()

            task.then(() => this.run.delete(task))
            this.run.add(task)
        }
    }
}

const scheduler = new Schedular(2)
const addTask = (time, order) => {
    scheduler.add(time, order)
}
addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")
scheduler.taskStart()
