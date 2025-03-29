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
    [Symbol.iterator]() {
        return {
            i: 0,
            next() {
                if (this.i < 5) {
                    return {
                        value: this.i++,
                        done: false
                    }
                }
                return { value: undefined, done: true }
            }
        }
    }
}

// 测试
for (let i of obj) {
    console.log("i", i)  // 依次输出 0,1,2,3,4
}
