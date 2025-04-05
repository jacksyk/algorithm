/**
 * @url https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let res = 0 // 结果
    let slow = 0

    for (let fast = 0; fast < s.length; fast++) {
        const cur = s[fast]
        const str = s.slice(slow, fast)
        const idx = str.indexOf(cur)
        if (idx !== -1) {
            slow += idx + 1
        }
        res = Math.max(res, fast - slow + 1)
    }
    return res
};