// 1.承接上一次Promise的值
// 2.return的值不会被任何地方接收
Promise.prototype._finally = function (callback) {
    return this.then(
        (res) => {
            callback()
            return res
        },
        (err) => {
            callback()
            throw err
        }
    )
}

function my(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}
const promise1 = () => my(300)

// promise1()
//     .then((res) => {
//         console.log(res)
//         return "111"
//     })
//     ._finally((res) => {
//         console.log(res)
//         return "hellow"
//     })
//     .then((res) => {
//         console.log("finally", res)
//     })

// promise1()
//     .then((res) => {
//         console.log(res)
//         return "111"
//     })
//     .finally((res) => {
//         console.log(res)
//         return "hellow"
//     })
//     .then((res) => {
//         console.log("finally", res)
//     })
Promise.reject("err")
    .finally(() => {
        console.log("finally")
    })
    .catch(console.log)
    .then((res) => console.log(res))
