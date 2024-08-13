/**
 * @url https://leetcode.cn/problems/integer-break/description/
 */

// dp[n]表示n拆分至少两个数的最大乘积
function integerBreak(n: number): number {
    const dp = new Array(n + 1).fill(0)
    dp[0] = 0
    dp[1] = 0
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j])
        }
    }
    return dp[n]
}
