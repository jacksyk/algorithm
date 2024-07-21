/**
 * @url https://leetcode.cn/problems/partition-equal-subset-sum/description/
 */

// dp[i][j]表示物品[0,i]的背包，容量为j的最大价值

// dp[i][j] = Math.max(dp[i-1][j],dp[i-1][j-weight[i]]+value[i])
function canPartition(nums: number[]): boolean {
    const target = nums.reduce((acc, cur) => acc + cur, 0) / 2
    if (!Number.isInteger(target)) return false

    const dp: number[][] = new Array(nums.length).fill(0).map((_arr) => new Array(target + 1).fill(0))

    for (let row = 0; row < nums.length; row++) {
        dp[row][0] = 0
    }
    for (let col = 0; col < target + 1; col++) {
        if (col > nums[0]) {
            dp[0][col] = nums[0]
        }
    }

    for (let row = 1; row < nums.length; row++) {
        for (let col = 1; col < target + 1; col++) {
            if (col - nums[row] >= 0) {
                dp[row][col] = Math.max(dp[row - 1][col], dp[row - 1][col - nums[row]] + nums[row])
            } else {
                dp[row][col] = dp[row - 1][col]
            }
        }
    }

    return dp[nums.length - 1][target] === target
}
