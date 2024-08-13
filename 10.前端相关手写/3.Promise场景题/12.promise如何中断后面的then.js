// Promise.resolve()
//     .then(() => {
//         console.log(111)
//     })
//     .then(() => {
//         console.log(222)
//     })
// 打印 111 222

Promise.resolve()
    .then(() => {
        console.log(1111)
        return new Promise(() => {})
    })
    .then(() => {
        console.log(2222)
    })
