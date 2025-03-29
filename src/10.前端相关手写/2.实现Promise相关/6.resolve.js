// 实现resolve函数
// - thenable对象
// - promise对象
// - 值
function myResolve(value) {
    // 如果 value 已经是 Promise 对象，则直接返回该 Promise 对象
    if (value instanceof Promise) {
        return value
    }
    // 如果 value 是 thenable 对象，则包装成 Promise 对象并返回
    if (value && typeof value.then === "function") {
        return new Promise(function (resolve, reject) {
            value.then(resolve, reject)
        })
    }
    // 将传入的值作为 Promise 的成功值，并返回 Promise 对象
    return new Promise(function (resolve) {
        resolve(value)
    })
}

// thenable对象
const obj = {
    then(resolve, reject) {
        resolve("111")
    },
}
