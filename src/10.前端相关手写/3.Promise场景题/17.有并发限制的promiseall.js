/** https://github.com/Sunny-117/js-challenges/issues/147 */
// async-pool思想 和 compose思想 基于递归
Promise._all = function (promises) {
    const limit = 2
    const result = []
    const runnerCount = []
    for (let i = 0; i < promises.length; i++) {
        promises.then(() => {})
    }
}
