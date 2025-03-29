/**
 * @url https://leetcode.cn/problems/valid-parentheses/
 */
function isValid(s: string): boolean {
    let obj = {
            ")": "(",
            "}": "{",
            "]": "[",
        },
        stack: Array<string> = []
    for (let i = 0; i < s.length; i++) {
        if (obj[s[i]] && stack.length > 0) {
            const top = stack[stack.length - 1]
            if (top === obj[s[i]]) {
                stack.pop()
            } else {
                stack.push(s[i])
            }
        } else {
            stack.push(s[i])
        }
    }

    return stack.length === 0
}
