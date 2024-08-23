// const arr = [
//     [1, 2],
//     [3, 4],
//     [5, 6],
// ]
// const handle = (trees) => {
//     const compute = (point1, point2) => {
//         const { x, y } = point1
//         const { x: lastX, y: lastY } = point2
//         return Math.sqrt(Math.pow(lastX - x, 2) + Math.pow(lastY - y, 2))
//     }
//     const dp = new Array(trees.length + 1).fill(0)
//     dp[0] = 0
//     dp[1] = compute(
//         {
//             x: 1,
//             y: 2,
//         },
//         {
//             x: 0,
//             y: 0,
//         }
//     )
//     for (let i = 2; i < dp.length; i++) {
//         dp[i] = Math.min(
//             dp[i - 1] +
//                 2 * compute({ x: trees[i - 1][0], y: trees[i - 1][1] }, { x: trees[i - 2][0], y: trees[i - 2][1] })
//         )
//     }
//     return dp[dp.length - 1]
// }
// console.log(handle(arr))
