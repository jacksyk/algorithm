/**
 * @url https://leetcode.cn/problems/combination-sum-iv/description/
 */

// dp[j]表示装满背包为j的元素组合的个数
// notice:其实这个地方就是一个排列

function combinationSum4(nums: number[], target: number): number {
    const dp = new Array(target + 1).fill(0)
    dp[0] = 1
    for (let j = 0; j < target + 1; j++) {
        for (let i = 0; i < nums.length; i++) {
            if (j - nums[i] >= 0) {
                dp[j] += dp[j - nums[i]]
            }
        }
    }

    return dp[target]
}

console.log(combinationSum4([1, 2, 3], 4))
