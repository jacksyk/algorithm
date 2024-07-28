/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/description/
 */

export {}

// 两笔交易
// dp[i][0]表示在第i天中，第一次买入股票的最大利润 dp[i][0] = dp[i-1][0],-price[i]
// dp[i][1]表示在第i天中，第一次卖出股票的最大利润 dp[i][1] = dp[i-1][1],dp[i-1][0]+price[i]
// dp[i][2]表示在第i天中，第二次买入股票的最大利润 dp[i][2] = dp[i-1][2],dp[i-1][1]-price[i]
// dp[i][3]表示在第i天中，第二次卖出股票的最大利润 dp[i][3] = dp[i-1][3],dp[i-1][2]+price[i]
function maxProfit(k: number, prices: number[]): number {
    const dp: number[][] = new Array(prices.length).fill(0).map((_item) => new Array(2 * k).fill(0))
    for (let i = 0; i < 2 * k; i++) {
        if (i % 2 === 0) {
            dp[0][i] = -prices[0]
        } else {
            dp[0][i] = 0
        }
    }
    for (let i = 1; i < prices.length; i++) {
        for (let j = 0; j < 2 * k; j++) {
            if (j === 0) {
                dp[i][j] = Math.max(dp[i - 1][0], -prices[i])
            } else {
                if (j % 2 === 0) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] - prices[i])
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] + prices[i])
                }
            }
        }
    }
    return dp[prices.length - 1][2 * k - 1]
}
