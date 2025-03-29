/**
 * @url https://leetcode.cn/problems/coin-change/description/
 */

// dp[j]表示刚好装满容量为j的最少硬币个数
function coinChange(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER) // notice：初始化的时候：保证能够不是最初的小值
    dp[0] = 0
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
        }
    }
    console.log(dp)
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount]
}
