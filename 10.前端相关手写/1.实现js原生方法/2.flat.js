// 有点小混乱
// Array.prototype.myFlat = function flat(depth = 1) {
//     const dfs = (arr, deep) => {
//         const temp = []
//         if (deep > depth) {
//             return arr
//         }
//         for (let i = 0; i < arr.length; i++) {
//             if (arr[i] instanceof Array) {
//                 temp.push(...dfs(arr[i].concat(), deep + 1))
//             } else {
//                 temp.push(arr[i])
//             }
//         }
//         return temp
//     }
//     return dfs(arr.concat(), 0)
// }
// let arr = [1, 2, 3, [3, 2, [1, 2, 3]]]
// console.log(arr.myFlat(2))
