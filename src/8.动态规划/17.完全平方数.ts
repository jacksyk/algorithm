/**
 * @url https://leetcode.cn/problems/perfect-squares/description/
 */

// dp[n]表示容量为n的情况下，最少需要多少整数来组成n
function numSquares(n: number): number {
    const dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER)
    dp[0] = 0
    for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
        for (let j = Math.pow(i, 2); j <= n; j++) {
            dp[j] = Math.min(dp[j], dp[j - Math.pow(i, 2)] + 1)
        }
    }
    return dp[n]
}
