// 实现reject函数
// - 普通值 直接catch捕获
// - promise 抛出这个promis，不会重复利用promise的值
Promise._reject = function (value) {
    return new Promise((_, reject) => {
        reject(value)
    })
}
