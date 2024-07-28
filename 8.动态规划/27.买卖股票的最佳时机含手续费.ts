/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/
 */
export {}

// dp[i][0]表示持有股票拥有的最大利润
// dp[i][1]表示不持有股票拥有的最大利润
function maxProfit(prices: number[], fee: number): number {
    const dp = new Array(prices.length).fill(0).map((_v) => new Array(2).fill(0))
    dp[0][0] = -prices[0]
    dp[0][1] = 0
    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i] - fee)
    }
    return dp[prices.length - 1][1]
}

maxProfit([1, 3, 2, 8, 4, 9], 2)
