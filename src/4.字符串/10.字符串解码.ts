/**
 * @url https://leetcode.cn/problems/decode-string/description/?envType=study-plan-v2&envId=top-100-liked
 */

// @ts-nocheck

/**
 * @param {string} s
 * @return {string}
 */

// ps: 模拟栈操作
// "3[a]2[bc]"
var decodeString = function (s: string) {
    const stack: Array<string> = []
    if (s.length === 0) return ''
    for (let i = 0; i < s.length; i++) {
        const curWord = s[i]
        if (curWord === ']') {
            const tmpStrArray: string[] = []
            while (stack.length && stack[stack.length - 1] !== '[') {
                tmpStrArray.push(stack.pop())
            }
            stack.pop() // 去掉左括号
            const numArr: number[] = []
            while (stack[stack.length - 1] >= '0' && stack[stack.length - 1] <= '9') {
                numArr.unshift(stack.pop())
            }
            let num = Number(numArr.join(''))
            while (num--) {
                stack.push(...tmpStrArray.toReversed())
            }
        } else {
            stack.push(curWord)
        }
    }
    return stack.join('')
};