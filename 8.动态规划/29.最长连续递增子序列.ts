/**
 * @url https://leetcode.cn/problems/longest-continuous-increasing-subsequence/description/
 */

// dp[i]表示到第i个位置的连续子序列的长度
function findLengthOfLCIS(nums: number[]): number {
    const dp = new Array(nums.length).fill(1)
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            dp[i] = Math.max(dp[i - 1] + 1, dp[i])
        }
    }
    return Math.max(...dp)
}
