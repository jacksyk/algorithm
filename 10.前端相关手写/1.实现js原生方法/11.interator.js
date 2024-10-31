// 实现迭代器
// Array.prototype._interator = function () {
//     let i = 0
//     return {
//         next: () => {
//             return {
//                 value: this[i++],
//                 done: i < this.length ? false : true,
//             }
//         },
//     }
// }
// let arr = [1, 2, 3, 4, 5]
// const b = arr._interator()
// console.log(b.next())
// console.log(b.next())
// console.log(b.next())
// console.log(b.next())
// console.log(b.next())

let obj = {
    i: 0,
    next() {
        return {
            value: i++,
            done: i < 5 ? false : true,
        }
    },
}
for (let i of obj) {
    console.log("i", i)
}
