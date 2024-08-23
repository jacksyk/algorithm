/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
 */

// dp[i][0]表示第i天手上有股票时候的能够获取的最大利润
// dp[i][1]表示第i天手上没有股票时候的能够获取的最大利润
// dp[i][2]表示第i天处于冷冻期的时候的最大利润

// 状态还是没考虑全
// function maxProfit(prices: number[]): number {
//     const dp = new Array(prices.length).fill(0).map((_item) => new Array(3).fill(0))
//     dp[0][0] = -prices[0]
//     dp[0][1] = 0
//     dp[0][0] = 0

//     for (let i = 1; i < prices.length; i++) {
//         dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i], dp[i - 1][2] - prices[i])
//         dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i], dp[i - 1][2])
//         dp[i][2] = Math.max(dp[i - 1][0] + prices[i], dp[i - 1][2])
//     }
//     return Math.max(...dp[prices.length - 1])
// }

// TODO:再来做一遍
// notice:关键点：不持有股票的状态拆分出来
// 初始化如果非法的话，可以从递推公式来看具体初始化多少
// dp[i][0]表示持有股票的最大利润 dp[i-1][0],dp[i-1][2]-price[i],dp[i-1][3]-price[i]
// dp[i][1]表示今天卖出股票，下一天是冷冻期 dp[i-1][0]+price[i]
// dp[i][2]表示冷冻期之后保持卖出的状态 dp[i-1][2],dp[i-1][3]
// dp[i][3]表示冷冻期的状态 dp[i-1][1]
function maxProfit(prices: number[]): number {
    const dp = new Array(prices.length).fill(0).map((_v) => new Array(4).fill(0))
    dp[0][0] = -prices[0]
    dp[0][1] = 0
    dp[0][2] = 0
    dp[0][3] = 0
    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - prices[i], dp[i - 1][3] - prices[i])
        dp[i][1] = dp[i - 1][0] + prices[i]
        dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][3])
        dp[i][3] = dp[i - 1][1]
    }
    return Math.max(...dp[prices.length - 1])
}

// 这里如果要做空间优化，需要去做赋值顺序的调整
