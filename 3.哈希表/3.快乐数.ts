/**
 * @url https://leetcode.cn/problems/happy-number/description/
 */

const getSqrtNum = (num: string) => {
    let sum = 0
    for (let i = 0; i < num.length; i++) {
        sum += Math.pow(Number(num[i]), 2)
    }
    return sum
}
function isHappy(n: number): boolean {
    const set = new Set()
    while (true) {
        if (n === 1) {
            return true
        }
        if (set.has(n)) return false
        set.add(n)
        n = getSqrtNum(n.toString())
    }
}
