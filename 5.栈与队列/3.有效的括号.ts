/**
 * @url https://leetcode.cn/problems/valid-parentheses/
 */
function isValid(s: string): boolean {
    let pushS = ["(", "{", "["],
        compare = [")", "}", "]"],
        stack: Array<string> = [],
        compareStack: Array<string> = []
    for (let i = 0; i < s.length; i++) {
        if (pushS.includes(s[i])) {
            stack.push(s[i])
        } else {
            const top = stack.concat([]).pop()
            compareStack.push(s[i])

            if (top === pushS[0]) {
                if (s[i] === compare[0]) {
                    compareStack.pop()
                    stack.pop()
                }
            }
            if (top === pushS[1]) {
                if (s[i] === compare[1]) {
                    compareStack.pop()
                    stack.pop()
                }
            }
            if (top === pushS[2]) {
                if (s[i] === compare[2]) {
                    compareStack.pop()
                    stack.pop()
                }
            }
        }
    }

    return stack.length === 0 && compareStack.length === 0
}
