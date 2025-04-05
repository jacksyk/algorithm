/**
 * @url https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// @ts-nocheck
// 字符串 -> 下标26位索引
const generateKey = (str) => {
    const positionArray = new Array(26).fill(0)
    for (let i = 0; i < str.length; i++) {
        const diff = str[i].charCodeAt(0) - 'a'.charCodeAt(0)
        positionArray[diff]++
    }
    return positionArray.join('-')
}

var findAnagrams = function (s, p) {
    const key = generateKey(p)
    const res = []
    for (let i = 0; i < s.length - p.length + 1; i++) {
        const str = s.slice(i, i + p.length)
        const strKey = generateKey(str)
        if (strKey === key) {
            res.push(i)
        }
    }
    return res
};