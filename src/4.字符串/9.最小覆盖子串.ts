/**
 * @url https://leetcode.cn/problems/minimum-window-substring/description/?envType=study-plan-v2&envId=top-100-liked
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

var minWindow = function (s, t) {
    const map1 = new Map()
    for (let char of t) {
        map1.set(char, (map1.get(char) ?? 0) + 1)
    }
    let slow = 0, fast = 0, count = Number.MAX_SAFE_INTEGER, res = '', formed = 0
    const map2 = new Map()
    while (fast < s.length) {
        const char = s[fast]
        map2.set(char, (map2.get(char) ?? 0) + 1)
        // ps: 判断当前字符满不满足要求，为什么不用大于等于？ --- 会造成重复计算，这个地方仅仅是为了计算满足的字符个数
        if (map1.get(char) === map2.get(char)) {
            formed++
        }
        // 滑动窗口进行缩小
        while (formed === map1.size && slow <= fast) {
            const len = fast - slow + 1
            if (len < count) {
                res = s.slice(slow, fast + 1)
                count = len
            }
            const slowChar = s[slow]
            map2.set(slowChar, (map2.get(slowChar) ?? 0) - 1)
            // ps: 注意这块的一个判断条件，只有小于，才会是不满足！！！ 和上面那个地方的ps是对应的，在这一块
            if (map1.get(slowChar) > map2.get(slowChar)) {
                formed--
            }
            slow++
        }
        fast++
    }
    return res
};