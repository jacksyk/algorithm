// 题目
//  new Quene()
// .task(1000, () => {
//   console.log(1)
// })
// .task(2000, () => {
//   console.log(2)
// })
// .task(1000, () => {
//   console.log(3)
// })
// .start()

// function Quene() { ... } //补全代码

function Quene() {
    this.queue = []
    this.task = function (time, callback) {
        let promise = () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    callback()
                    resolve()
                }, time)
            })
        this.queue.push(promise)
        return this
    }
    this.start = function () {
        this.queue.reduce((pre, cur) => pre.then(() => cur()), Promise.resolve())
    }
}
new Quene()
    .task(1000, () => {
        console.log(1)
    })
    .task(2000, () => {
        console.log(2)
    })
    .task(1000, () => {
        console.log(3)
    })
    .start()
