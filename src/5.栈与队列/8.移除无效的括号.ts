/**
 * @url https://leetcode.cn/problems/minimum-remove-to-make-valid-parentheses/description/
 */

/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
    const indexArray = new Array(s.length).fill(false)
    const strArray: Array<number> = []
    for (let i = 0; i < s.length; i++) {
        const str = s[i]
        if (str === '(') {
            strArray.push(i)
            indexArray[i] = true
        }
        if (str === ')') {
            if (strArray.length === 0) {
                indexArray[i] = true
            } else {
                const idx = strArray.pop()
                indexArray[idx!] = false
            }
        }
    }
    const res: Array<string> = []
    for (let i = 0; i < s.length; i++) {
        if (!indexArray[i]) {
            res.push(s[i])
        }
    }
    return res.join('')
};