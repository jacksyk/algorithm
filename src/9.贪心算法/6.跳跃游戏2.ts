/**
 * @url https://leetcode.cn/problems/jump-game-ii/description/
 */

// 输入: nums = [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。

// dp[i]表示到达位置i的最小跳跃数
// function jump(nums: number[]): number {
//     const dp = new Array(nums.length).fill(Number.MAX_SAFE_INTEGER)
//     dp[0] = 0
//     for (let i = 1; i < nums.length; i++) {
//         for (let j = 0; j < i; j++) {
//             if (j + nums[j] >= i) {
//                 dp[i] = Math.min(dp[i], dp[j] + 1)
//             }
//         }
//     }
//     return dp[nums.length - 1]
// }

// 贪心算法
function jump(nums: number[]): number {
    if (nums.length === 1) return 0
    let steps = 0, //步数
        currentScope = 0,
        nextStepScope = 0
    for (let i = 0; i < nums.length; i++) {
        nextStepScope = Math.max(nextStepScope, i + nums[i])
        if (i === currentScope) {
            steps++
            currentScope = nextStepScope
            if (nextStepScope >= nums.length - 1) {
                break
            }
        }
    }
    return steps
}
