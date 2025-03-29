// Notice:回调函数没有this
// Array.prototype.myFilter = (callback) => {
//     console.log(this)
//     const result = []
//     for (let i = 0; i < this.length; i++) {
//         console.log(callback(this[i]))
//         if (callback(this[i], i, this)) {
//             result.push(this[i])
//         }
//     }
//     return result
// }

// 普通遍历实现
// Array.prototype.myFilter = function (callback) {
//     const result = []
//     for (let i = 0; i < this.length; i++) {
//         if (callback(this[i], i, this)) {
//             result.push(this[i])
//         }
//     }
//     return result
// }

// reduce来实现
Array.prototype.myFilter = function (callback) {
    return this.reduce((acc, cur, index) => {
        if (callback(cur, index)) {
            acc.push(cur)
        }
        return acc
    }, [])
}
let arr = [1, 2, 3, 4, 5]
arr = arr.myFilter((item) => {
    return item >= 3
})
console.log(arr)
