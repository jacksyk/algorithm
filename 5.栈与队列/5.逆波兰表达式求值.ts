/**
 * @url https://leetcode.cn/problems/evaluate-reverse-polish-notation/description/
 */

const operators = ["+", "-", "*", "/"]
type computeType = "+" | "-" | "*" | "/"
const compute = (operators: computeType, top1: string, top2: string) => {
    switch (operators) {
        case "+":
            return String(Number(top1) + Number(top2))
        case "-":
            return String(Number(top1) - Number(top2))
        case "*":
            return String(Number(top1) * Number(top2))
        case "/":
            return String(Number.parseInt(String(Number(top1) / Number(top2)))) //notice: Math.floor向下取整,注意负数的形式。 -0.4 会取整为-1
    }
}

function evalRPN(tokens: string[]): number {
    let stack: Array<string> = [] // 存储栈
    for (let i = 0; i < tokens.length; i++) {
        console.log("tokens", stack)

        if (operators.includes(tokens[i])) {
            if (stack.length < 2) {
                stack.push(tokens[i])
            } else {
                const top2 = stack.pop()
                const top1 = stack.pop()
                stack.push(compute(tokens[i] as computeType, top1!, top2!))
            }
        } else {
            stack.push(tokens[i])
        }
    }
    return Number(stack.pop())
}

// console.log(evalRPN(["2", "1", "+", "3", "*"]))
// console.log(evalRPN(["4", "13", "5", "/", "+"]))
