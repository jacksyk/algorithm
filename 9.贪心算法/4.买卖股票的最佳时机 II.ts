/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/
 */

// 动态规划
// dp[i][0]表示第i天手上有股票的最大利润 dp[i][0] = dp[i-1][1]-nums[i] dp[i][0]
// dp[i][1]表示第i天手上没有股票的最大利润 dp[i][1] = dp[i-1][0]+nums[i] dp[i-1][1]
// function maxProfit(prices: number[]): number {
//     const dp = new Array(prices.length + 1).fill(0).map((_v) => new Array(2).fill(0))
//     dp[0][0] = -prices[0] // TODO:换了下标，这里的初始化还是需要改变
//     for (let i = 1; i <= prices.length; i++) {
//         dp[i][0] = Math.max(dp[i - 1][1] - prices[i - 1], dp[i - 1][0])
//         dp[i][1] = Math.max(dp[i - 1][0] + prices[i - 1], dp[i - 1][1])
//     }
//     console.table(dp)
//     return dp[prices.length][1]
// }
// console.log(maxProfit([7, 1, 5, 3, 6, 4]))
// 贪心算法
function maxProfit(prices: number[]): number {
    // 计算数组中的间隔
    const init = (arr: number[]) => {
        const temp: number[] = []
        for (let i = 1; i < arr.length; i++) {
            temp.push(arr[i] - arr[i - 1])
        }
        return temp
    }
    const intervalArray = init(prices)
    return intervalArray.reduce((acc, cur) => {
        if (cur >= 0) {
            return acc + cur
        }
        return acc
    }, 0)
}
