/**
 * @url https://leetcode.cn/problems/maximum-subarray/
 */

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6。

// dp[i]表示以nums[i-1]为结尾的最大子数组和 dp[i] = dp[i-1]+nums[i]
// function maxSubArray(nums: number[]): number {
//     const dp = new Array(nums.length + 1).fill(Number.MIN_SAFE_INTEGER)

//     for (let i = 1; i <= nums.length; i++) {
//         dp[i] = Math.max(dp[i - 1] + nums[i - 1], nums[i - 1])
//     }
//     console.table(dp)
//     return Math.max(...dp)
// }

// TODO:贪心做法
function maxSubArray(nums: number[]): number {
  let count = 0, //统计目前累加的和
    result = Number.MIN_SAFE_INTEGER; // 放置结果
  for (let i = 0; i < nums.length; i++) {
    count += nums[i];
    if (count > result) {
      result = count;
    }
    if (count < 0) {
      count = 0;
    }
  }
  return result;
}
