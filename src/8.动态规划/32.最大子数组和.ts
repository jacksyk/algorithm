/**
 * @url https://leetcode.cn/problems/maximum-subarray/description/
 */

// dp[i]表示下标为i结尾的子数组的最大和
// dp[i] = dp[i-1],
function maxSubArray(nums: number[]): number {
    const dp = new Array(nums.length).fill(0)
    dp[0] = nums[0]
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    }
    console.log(dp)
    return Math.max(...dp)
}
// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
