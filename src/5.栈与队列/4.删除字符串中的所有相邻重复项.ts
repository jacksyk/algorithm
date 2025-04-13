/**
 * @url https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/
 */
function removeDuplicates(s: string): string {
    const sArray = s.split("")
    let stack: Array<string> = []
    for (let i = 0; i < sArray.length; i++) {
        if (stack.length === 0) {
            stack.push(sArray[i])
        } else {
            let top = stack[stack.length - 1]
            // let top = stack.concat().pop() // todo 这样会超时
            if (sArray[i] === top) {
                stack.pop()
            } else {
                stack.push(sArray[i])
            }
        }
    }
    return stack.join("")
}
