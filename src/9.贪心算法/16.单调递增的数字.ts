/**
 * @url https://leetcode.cn/problems/monotone-increasing-digits/description/
 */

// 当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。
// 给定一个整数 n ，返回 小于或等于 n 的最大数字，且数字呈 单调递增 。
// TODO:遍历顺序，从前到后，不能利用上次已经改变的结果！！！！比如1009 123329，体会一下  从前到后遍历，也会影响前面相应的比较
// notice:这样的方法，没有考虑到前面改变了，后面会改变。应该统一将后面改为9
// function monotoneIncreasingDigits(n: number): number {
//     const arr = n
//         .toString()
//         .split("")
//         .map((_num) => Number.parseInt(_num))
//     for (let i = arr.length - 2; i >= 0; i--) {
//         if (arr[i] > arr[i + 1]) {
//             arr[i] -= 1
//             arr[i + 1] = 9
//         }
//     }
//     return Number.parseInt(arr.join(""))
// }
// TODO:细节挺多的
function monotoneIncreasingDigits(n: number): number {
    const arr = n
        .toString()
        .split("")
        .map((_num) => Number.parseInt(_num))
    let flag = arr.length
    for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i] > arr[i + 1]) {
            arr[i] -= 1
            flag = i + 1
        }
    }
    for (let i = flag; i < arr.length; i++) {
        arr[i] = 9
    }
    return Number.parseInt(arr.join(""))
}
