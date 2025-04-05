/**
 * @url https://leetcode.cn/problems/edit-distance/description/
 */

export { }
// function minDistance(word1: string, word2: string): number {
//     const dp = new Array(word1.length + 1).fill(0).map((_v) => new Array(word2.length + 1).fill(0))

//     for (let i = 1; i <= word1.length; i++) {
//         for (let j = 1; j <= word2.length; j++) {
//             if (word1[i - 1] === word2[j - 1]) {
//                 dp[i][j] = dp[i - 1][j - 1] + 1
//             } else {
//                 dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
//             }
//         }
//     }
//     const max = dp[word1.length][word2.length]

//     if (word1.length > word2.length) {
//         return Math.abs(word1.length - max)
//     } else {
//         return Math.abs(word2.length - max)
//     }
// }
// notice：不要想着操作都为替换，注意子序列中间的相对顺序
// intention
// execution

// console.log(minDistance("intention", "execution"))

// TODO:最长重复子数组试试，不行还是是相对顺序的原因

// TODO:需要的最少操作
function minDistance(word1: string, word2: string): number {
    const dp = new Array(word1.length + 1).fill(0).map((_v) => new Array(word2.length + 1).fill(0))
    for (let i = 0; i <= word1.length; i++) {
        dp[i][0] = i
    }
    for (let j = 0; j <= word2.length; j++) {
        dp[0][j] = j
    }
    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                // ps:（修改: dp[i - 1][j - 1], 删除: dp[i - 1][j], 增加: dp[i][j - 1]），
                // ps：删除和增加是一起的
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1)
            }
        }
    }
    return dp[word1.length][word2.length]
}
