/**
 * @url https://leetcode.cn/problems/longest-palindromic-subsequence/description/
 */
// dp[i][j] 区间[i,j]之间的最长回文子序列 s[i]===s[j]? dp[i+1][j-1]+2: dp[i+1][j] dp[i][j-1]
function longestPalindromeSubseq(s: string): number {
    const dp = new Array(s.length).fill(0).map((_v) => new Array(s.length).fill(0))

    for (let i = 0; i < s.length; i++) {
        dp[i][i] = 1
    }

    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < s.length; j++) {
            // console.log("i", "j", i, j)
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[0][s.length - 1]
}
longestPalindromeSubseq("bbbab")
