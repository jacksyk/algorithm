// 获取所有Promise对象的状态

Promise._allSettled = function (promises) {
    let count = 0,
        result = []
    return new Promise((resolve) => {
        promises.forEach((_promise, _idx) => {
            _promise
                .then(
                    (res) => {
                        result[_idx] = {
                            status: "fulfilled",
                            value: res,
                        }
                    },
                    (err) => {
                        result[_idx] = {
                            status: "rejected",
                            value: err,
                        }
                    }
                )
                .finally(() => {
                    count++
                    if (count >= promises.length) {
                        resolve(result)
                    }
                })
        })
    })
}

const pro = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(3)
    }, 1000)
})

Promise.allSettled([pro, Promise.resolve(1), Promise.reject(2)]).then((data) => {
    console.log(data)
})

Promise._allSettled([pro, Promise.resolve(1), Promise.reject(2)]).then((data) => {
    console.log(data)
})
