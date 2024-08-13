/**
 * @url https://leetcode.cn/problems/coin-change-ii/description/
 */

// notice：背包容量为j的最大价值是否能为j，物品可以被选取多少次
// TODO:遍历顺序的考量。dp概念的理解
// []如果求组合数就是外层for循环遍历物品，内层for遍历背包。
// []如果求排列数就是外层for遍历背包，内层for循环遍历物品。
function change(amount: number, coins: number[]): number {
    const dp = new Array(amount + 1).fill(0)
    dp[0] = 1
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] += dp[j - coins[i]]
        }
    }
    console.log(dp)

    return dp[amount]
}

change(5, [1, 2, 5])
