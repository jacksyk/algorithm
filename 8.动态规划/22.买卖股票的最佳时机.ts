/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/
 */
export {}
// [7,1,5,3,6,4]  5
// 暴力解法--超时
// function maxProfit(prices: number[]): number {
//     let max = Number.MIN_SAFE_INTEGER
//     for (let i = 0; i < prices.length; i++) {
//         for (let j = i + 1; j < prices.length; j++) {
//             max = Math.max(max, prices[j] - prices[i])
//         }
//     }
//     return max < 0 ? 0 : max
// }

// dp[i][0] 表示 第i天持有股票所拥有的最大金额
//     保持上一次的持有股票状态
//     刚买入
// dp[i][1] 表示 第i天不持有股票所拥有的最大金额
//     上一次没有持有股票的状态
//     按照今天的股价卖出

// notice：表示一天时间
function maxProfit(prices: number[]): number {
    const dp = new Array(prices.length).fill(0).map((_item) => new Array(2).fill(0))
    dp[0][0] = -prices[0]
    dp[0][1] = 0
    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], -prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0])
    }
    return dp[prices.length - 1][1]
}

// TODO:一维数组优化
// notice:思路参考背包问题
function maxProfitOne(prices: number[]): number {
    const dp = new Array(2).fill(Number.MIN_SAFE_INTEGER)
    for (let i = 0; i < prices.length; i++) {
        // dp[i][0] = Math.max(dp[i - 1][0], -prices[i])
        // dp[i][1] = Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0])
        // TODO:这里本身会被覆盖，因此需要用两层递归
        dp[0] = Math.max(dp[0], -prices[i])
        dp[1] = Math.max(dp[1], dp[0] + prices[i])
    }
    return dp[1]
}
