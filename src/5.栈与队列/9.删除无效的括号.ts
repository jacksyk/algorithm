/**
 * @url https://leetcode.cn/problems/remove-invalid-parentheses/description/
 */

// ps =================================

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
    let l = 0, r = 0 // 左括号需要删除的数量，右括号需要删除的数量
    const set = new Set()
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            l++
        } else if (s[i] === ')') {
            if (l > 0) {
                l--
            } else {
                r++
            }
        }
    }

    const dfs = (l, r, idx, score, path) => {
        if (score < 0) return // 小于0代表已经不合法了
        if (idx === s.length) {
            if (score === 0) {
                set.add(path.join(''))
            }
            return
        }
        const word = s[idx]
        if (word === '(') {
            if (l > 0) {
                dfs(l - 1, r, idx + 1, score, [...path])
            }
            path.push(word)
            dfs(l, r, idx + 1, score + 1, [...path])
        } else if (word === ')') {
            if (r > 0) {
                dfs(l, r - 1, idx + 1, score, [...path])
            }
            path.push(word)
            dfs(l, r, idx + 1, score - 1, [...path])
        } else {
            path.push(word)
            dfs(l, r, idx + 1, score, [...path])
        }
    }
    dfs(l, r, 0, 0, [])
    return Array.from(set)
};
