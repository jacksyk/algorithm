/**
 * @url https://leetcode.cn/problems/jump-game/description/
 */

// 动态规划
// dp【i】表示是否能够到达第i个位置
// 从0开始 dp[j]+nums[j]是否大于i,大于就break
// function canJump(nums: number[]): boolean {
//     const dp = new Array(nums.length).fill(false)
//     dp[0] = true
//     for (let i = 1; i < nums.length; i++) {
//         for (let j = 0; j < i; j++) {
//             if (dp[j] && j + nums[j] >= i) {
//                 dp[i] = true
//                 break
//             }
//         }
//     }
//     // console.table(dp)
//     return dp[nums.length - 1]
// }
// console.log(canJump([2, 3, 1, 1, 4]))
// console.log(canJump([3, 2, 1, 0, 4]))

// 贪心算法(编码很简洁，但是很巧妙不好想到)
// 每次移动取最大跳跃步数（得到最大的覆盖范围），每移动一个单位，就更新最大覆盖范围。
// [2, 3, 1, 1, 4]

// notice:错误，想象一下，后一次的范围依赖于前一次的范围是否能够达到
// function canJump(nums: number[]): boolean {
//     let maximumRange = 0
//     for (let i = 0; i < nums.length - 1; i++) {
//         maximumRange = Math.max(maximumRange, i + nums[i])
//     }
//     console.log(maximumRange)

//     return maximumRange >= nums.length - 1
// }
// canJump([3, 2, 1, 0, 4])
function canJump(nums: number[]): boolean {
  let maximumRange = 0;
  for (let i = 0; i <= maximumRange && i < nums.length; i++) {
    maximumRange = Math.max(maximumRange, i + nums[i]);
  }

  return maximumRange >= nums.length - 1;
}
// canJump([2, 3, 1, 1, 4])
