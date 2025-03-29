/**
 * @url https://leetcode.cn/problems/repeated-substring-pattern/description/
 */
function repeatedSubstringPattern(s: string): boolean {
    for (let i = 0; i < Math.floor(s.length / 2); i++) {
        let len = Math.floor(s.length / s.slice(0, i + 1).length)
        if (s.slice(0, i + 1).repeat(len) === s) return true
    }
    return false
}
