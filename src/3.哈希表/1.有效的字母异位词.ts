/**
 * @url https://leetcode.cn/problems/valid-anagram/description/
 */

// ps: 通过map的值来判断
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
// ps: 通过key是否相同的维度
function getKey(s) {
    const arr = new Array(26).fill(0)
    for (let i = 0; i < s.length; i++) {
        arr[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
    }
    return arr.join('-')
}
function isAnagramV2(s: string, t: string): boolean {
    return getKey(s) === getKey(t)
};
