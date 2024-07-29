/**
 * @url https://leetcode.cn/problems/is-subsequence/description/
 */

// TODO:双指针来判断
// TODO:动态规划
// abc
// abcdef
// dp[i][j]表示以s[i-1]为结尾,t[j-1]为结尾最长公共子序列
// s[i-1]===t[j-1]?dp[i-1][j-1]+1:dp[i][j-1] ac addddc
// notice:删除s的话一定是比删除t匹配结果更少的（这里也可以理解为剪枝的操作）
// 结果比较最长公共子序列的长度是否和s的长度相等
function isSubsequence(s: string, t: string): boolean {
    if (s.length < 1) {
        return true
    }
    const dp = new Array(s.length + 1).fill(0).map((_item) => new Array(t.length + 1).fill(0))
    dp[0][0] = 0
    dp[1][0] = 0
    dp[0][1] = 0
    for (let i = 1; i < s.length + 1; i++) {
        for (let j = 1; j < t.length + 1; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = dp[i][j - 1]
            }
        }
    }
    return dp[s.length][t.length] === s.length
}
