Promise._all = function (promises) {
    let count = 0 // 记录完成的数量
    const result = []
    return new Promise((resolve, reject) => {
        promises.forEach((_promise, _idx) => {
            _promise().then((res) => {
                result[_idx] = res
                count++
                if (count === promises.length) {
                    resolve(result)
                }
            })
        })
    })
}
function my(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}

const promise1 = () => my(2000)
const promise2 = () => my(3000)
const promise3 = () => my(5000)
const promise4 = () => my(4000)

Promise._all([promise1, promise2, promise3, promise4]).then((res) => {
    console.log(res)
})
