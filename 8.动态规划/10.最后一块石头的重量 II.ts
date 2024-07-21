/**
 * @url https://leetcode.cn/problems/last-stone-weight-ii/description/
 */

// TODO:如何将问题抽象成01背包问题？
function lastStoneWeightII(stones: number[]): number {
    const sum = stones.reduce((acc, cur) => acc + cur, 0)
    const target = Math.floor(sum / 2)
    const dp = new Array(stones.length).fill(0).map((_arr) => new Array(target + 1).fill(0))
    for (let i = 0; i < stones.length; i++) {
        dp[i][0] = 0
    }
    for (let j = 0; j <= target; j++) {
        if (j >= stones[0]) {
            dp[0][j] = stones[0]
        } else {
            dp[0][j] = 0
        }
    }

    for (let row = 1; row < stones.length; row++) {
        for (let col = 1; col <= target; col++) {
            if (col - stones[row] >= 0) {
                dp[row][col] = Math.max(dp[row - 1][col], dp[row - 1][col - stones[row]] + stones[row])
            } else {
                dp[row][col] = dp[row - 1][col]
            }
        }
    }
    return Math.abs(sum - dp[stones.length - 1][target] - dp[stones.length - 1][target])
}
