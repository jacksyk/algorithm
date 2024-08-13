// 手写Promise.race
Promise._race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((_promise) => {
            _promise
                .then((res) => {
                    resolve(res)
                })
                .catch(reject)
        })
    })
}

const promise1 = new Promise((resolve) =>
    setTimeout(() => {
        resolve(1)
    }, 300)
)

const promise2 = new Promise((reject) => {
    setTimeout(() => {
        reject(2)
    }, 400)
})

Promise._race([promise1, promise2])
    .then((res) => {
        console.log(res)
    })
    .catch(console.log)
