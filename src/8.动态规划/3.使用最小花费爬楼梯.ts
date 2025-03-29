/**
 * @url https://leetcode.cn/problems/min-cost-climbing-stairs/description/
 */

// notice：注意审题，可以从下标为0，下标为1开始爬
function minCostClimbingStairs(cost: number[]): number {
    const dp = new Array(cost.length + 1).fill(0) // notice：dp表示当前爬下标为n的楼梯所需要的最小花费, 到楼顶表示当前下标要溢出数组
    dp[0] = 0
    dp[1] = 0

    for (let i = 2; i <= cost.length; i++) {
        dp[i] = Math.min(dp[i - 2] + cost[i - 2], dp[i - 1] + cost[i - 1])
    }
    console.log(dp)

    return dp[dp.length - 1]
}
