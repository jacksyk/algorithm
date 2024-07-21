/**
 * @url https://leetcode.cn/problems/target-sum/description/
 */

// TODO:初始化很难
// notice:01背包应用之“有多少种不同的填满背包最大容量的方法“
function findTargetSumWays(nums: number[], target: number): number {
    let sum = nums.reduce((acc, cur) => acc + cur, 0)
    if (Math.abs(target) > sum) return 0
    let beibao = (sum + target) / 2
    if (!Number.isInteger(beibao)) return 0
    if (target > sum) return 0
    const dp = new Array(nums.length).fill(0).map((_arr) => new Array(beibao + 1 || 1).fill(0))

    dp[0][nums[0]] = 1 // 注意这个顺序

    // 背包容量为0，只要出现了0，就可以代表2^n

    let numZeros = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == 0) {
            numZeros++
        }
        dp[i][0] = Math.pow(2, numZeros)
    }

    for (let i = 1; i < nums.length; i++) {
        for (let j = 1; j < beibao + 1; j++) {
            if (j - nums[i] < 0) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i]]
            }
        }
    }
    console.table(dp)

    // console.log(dp)
    return dp[nums.length - 1][beibao]
}
