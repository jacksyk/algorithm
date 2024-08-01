/**
 * @url https://leetcode.cn/problems/delete-operation-for-two-strings/description/
 */
export {}
// aab  aac
// dp[i][j]表示以word1[i-1]为结尾和以word2[i-1]为结尾的最长公共子序列的长度
// 相等 dp[i][j] = dp[i-1][j-1]+1
// 不相等的话：dp[i][j] = max~dp[i-1][j],dp[i][j-1]
function minDistance(word1: string, word2: string): number {
    const dp = new Array(word1.length + 1).fill(0).map((_v) => new Array(word2.length + 1).fill(0))

    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    console.table(dp)

    return (
        Math.abs(dp[word1.length][word2.length] - word1.length) +
        Math.abs(dp[word1.length][word2.length] - word2.length)
    )
}
