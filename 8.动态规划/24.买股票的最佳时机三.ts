/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/description/
 */
export {}

// TODO:最多完成几笔交易，状态怎么办？想想前两次股票递推的第二个参数的意思  和前面两题是一样的

// dp[i][0]表示在第i天中，第一次买入股票的最大利润 dp[i][0] = dp[i-1][0],-price[i]
// dp[i][1]表示在第i天中，第一次卖出股票的最大利润 dp[i][1] = dp[i-1][1],dp[i-1][0]+price[i]
// dp[i][2]表示在第i天中，第二次买入股票的最大利润 dp[i][2] = dp[i-1][2],dp[i-1][1]-price[i]
// dp[i][3]表示在第i天中，第二次卖出股票的最大利润 dp[i][3] = dp[i-1][3],dp[i-1][2]+price[i]
function maxProfit(prices: number[]): number {
    const dp = new Array(prices.length).fill(0).map((_arr) => new Array(4).fill(0))
    dp[0][0] = -prices[0]
    dp[0][1] = 0
    dp[0][2] = -prices[0]
    dp[0][3] = 0
    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], -prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i])
        dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] - prices[i])
        dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] + prices[i])
    }
    return dp[prices.length - 1][3]
}

// TODO:空间优化
