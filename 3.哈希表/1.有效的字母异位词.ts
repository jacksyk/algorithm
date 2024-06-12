/**
 * @url https://leetcode.cn/problems/valid-anagram/description/
 */
function isAnagram(s: string, t: string): boolean {
    const mapS = new Map()
    for (let i = 0; i < s.length; i++) {
        if (mapS.has(s[i])) {
            mapS.set(s[i], mapS.get(s[i]) + 1)
        } else {
            mapS.set(s[i], 1)
        }
    }
    for (let i = 0; i < t.length; i++) {
        if (mapS.has(t[i])) {
            mapS.set(t[i], mapS.get(t[i]) - 1)
        } else {
            return false
        }
    }

    for (let value of mapS.values()) {
        if (value !== 0) return false
    }
    return true
}
// notice：使用Map能够覆盖所有情况的字母异味词
