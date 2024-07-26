/**
 * @url https://leetcode.cn/problems/word-break/description/
 */

// 排列还是组合，遍历顺序的考量 dp[j]表示长度为j的字符串是否能够被拼接
function wordBreak(s: string, wordDict: string[]): boolean {
    const dp = new Array(s.length + 1).fill(false)
    dp[0] = true

    for (let j = 1; j <= s.length; j++) {
        console.table(dp)

        for (let i = 0; i < wordDict.length; i++) {
            const word = wordDict[i]
            if (j >= word.length) {
                const word1 = s.slice(j - word.length, j)
                if (wordDict.indexOf(word1) !== -1 && dp[j - word.length]) {
                    dp[j] = true
                    break
                } else {
                    dp[j] = false
                }
            } else {
                dp[j] = false
            }
        }
    }
    console.table(dp)

    return dp[s.length]
}

wordBreak("applepenapple", ["apple", "pen"])
