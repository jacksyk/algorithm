export {}
/**
 * @url https://leetcode.cn/problems/house-robber/description/
 */

// dp[i]表示偷窃第i+1间房屋所能获得的最大金额
// dp[2] = dp[0]+cur, dp[1]
// dp[3] = dp[1]+cur,dp[2]
// dp[n] = dp[n-2]+cur dp[n-1]
function rob(nums: number[]): number {
    const dp = new Array(nums.length).fill(0)
    dp[0] = nums[0]
    if (nums.length === 1) {
        return dp[0]
    }
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1], dp[i])
    }

    return dp[nums.length - 1]
}
// 因为题目中都是正数，所以这里不需要考虑前面()，dp[i-1]一定是没有选择i的最大值，实际上也是运用到了一点贪心的策略

/**
 * @url https://leetcode.cn/problems/house-robber/description/
 */

// dp[i]表示偷窃第i+1间房屋所能获得的最大金额，
// dp[2] = dp[0]+cur, dp[1]
// dp[3] = dp[1]+cur,dp[2]
// dp[n] = dp[n-2]+cur dp[n-1]
function rob1(nums: number[]): number {
    const dp = new Array(nums.length).fill(0)
    dp[0] = nums[0]
    if (nums.length === 1) {
        return dp[0]
    }
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < nums.length; i++) {
        for (let j = 0; j < i - 1; j++) {
            // dp[j] + nums[i] 表示需要当天的
            // dp[i - 1] 不要当天
            // dp[i] 对比
            dp[i] = Math.max(dp[j] + nums[i], dp[i], dp[i - 1])
        }
    }

    return dp[nums.length - 1]
}
