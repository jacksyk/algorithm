/**
 * @url https://leetcode.cn/problems/distinct-subsequences/
 */

// s的子序列中t出现的个数 baggg bag
// notice:思考：为啥不是累加，而是前一次的和再加入的？
// dp[i][j] 以s[i-1],t[j-1]为结尾的t出现的个数 dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
// 每一次状态 + 上一次未比较的状态 可以举一个t的长度为1的例子
function numDistinct(s: string, t: string): number {
    const dp = new Array(s.length + 1).fill(0).map((_v) => new Array(t.length + 1).fill(0))
    for (let i = 0; i <= s.length; i++) {
        dp[i][0] = 1
    }
    for (let i = 1; i < s.length + 1; i++) {
        for (let j = 1; j < t.length + 1; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }

    console.table(dp)

    return dp[s.length][t.length]
}

numDistinct("babgbag", "bag")
