// 基于 tapable 思想，构造异步任务串
// https://juejin.cn/post/6844903700872298510
const repeat = (cb, delay = 1000, times = 5) => {
    /* 高阶函数 */
    return function (text) {
        const AsyncFn = () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    cb(text)
                    resolve()
                }, delay)
            })

        // 构建异步任务串
        new Array(times).fill(AsyncFn).reduce((acc, cur) => {
            return acc.then(() => cur())
        }, Promise.resolve())
        // ps: polifill如下
        // return Promise.resolve().then(() => AsyncFn()).then(() => AsyncFn()).then(() => AsyncFn()).then(() => AsyncFn())
    }
}

const mockLog = repeat(console.log)

mockLog("Hello world!!")
