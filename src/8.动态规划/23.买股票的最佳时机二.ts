/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/
 */
// dp[i][0]表示第i天所拥有的最大利润
// dp[i][0]表示第i天持有股票所拥有的最大利润
// dp[i][1]表示第i天不持有股票所拥有的最大利润
function maxProfit(prices: number[]): number {
    const dp: number[] = new Array(2).fill(0)
    dp[0] = -prices[0]
    dp[1] = 0
    for (let i = 1; i < prices.length; i++) {
        // 这里会被覆盖，可以用两层数组来保存
        dp[0] = Math.max(dp[0], dp[1] - prices[i])
        dp[1] = Math.max(dp[1], dp[0] + prices[i])
    }
    return dp[1]
}
