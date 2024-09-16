/**
 * @url https://leetcode.cn/problems/palindromic-substrings/description/
 */
// 示例 1：

// 输入：s = "abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"
// 示例 2：

// 输入：s = "aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

// dp[i][j]表示以区间[i,j]的子串是否是回文字符串
// s[i] === s[j]? dp[i][j] = dp[i+1][j-1]
// abba a(1) ab(2) abb(3) abba(5)
function countSubstrings(s: string): number {
    const dp = new Array(s.length).fill(true).map((_v) => new Array(s.length).fill(false))
    let res = 0

    // notice：根据递推公式来确认遍历顺序
    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = i; j < s.length; j++) {
            if (s[i] === s[j]) {
                if (j - i <= 1) {
                    dp[i][j] = true
                    res++
                } else if (dp[i + 1][j - 1]) {
                    dp[i][j] = true
                    res++
                }
            }
        }
    }
    return res
}
