/**
 * @url https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/description/
 */

// 优先负数，然后最小的正数
// notice：这种算法是只能选择一次
// function largestSumAfterKNegations(nums: number[], k: number): number {
//     nums.sort((a, b) => a - b)
//     let idx = 0
//     while (k--) {
//         nums[idx] = -nums[idx]
//         idx++
//     }
//     return nums.reduce((acc, cur) => acc + cur, 0)
// }

// 优先负数，然后对于最小的正数进行反转
// TODO:可以优化一下时间复杂度
// function largestSumAfterKNegations(nums: number[], k: number): number {
//     while (k--) {
//         nums.sort((a, b) => a - b)
//         let index = nums.findIndex((_num) => _num < 0)
//         nums[index] *= -1

//         if (index === -1) {
//             nums.sort((a, b) => a - b)
//             nums[0] *= -1
//         }
//     }
//     return nums.reduce((acc, cur) => acc + cur, 0)
// }

function largestSumAfterKNegations(nums: number[], k: number): number {
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0 && k > 0) {
            nums[i] *= -1
            k--
        }
    }
    nums.sort((a, b) => a - b)
    if (k % 2 === 1) {
        nums[0] *= -1
    }
    return nums.reduce((acc, cur) => acc + cur, 0)
}
