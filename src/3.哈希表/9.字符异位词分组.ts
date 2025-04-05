/**
 * @url https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked
 */

// ps:map的key用charcode拼接为字符串的值来区分
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const map = new Map()
    for (let i = 0; i < strs.length; i++) {
        const charArray = new Array(26).fill(0)
        // 遍历每个字符串
        for (let j = 0; j < strs[i].length; j++) {
            const diff = strs[i][j].charCodeAt(0) - 'a'.charCodeAt(0)
            charArray[diff]++
        }
        const charStr = charArray.join('-') // 这里的key注意有区分度
        if (map.has(charStr)) {
            const val = map.get(charStr)
            val.unshift(strs[i])
            map.set(charStr, val)
        } else {
            const res = []
            res.push(strs[i])
            map.set(charStr, res)
        }
    }
    return Array.from(map.values())
};

let strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
console.log('groupAnagrams(strs)', groupAnagrams(strs))

const set = new Set()
set.add('hello word')
set.add('hello word1')
set.add('hello word2')
set.add('hello word3')