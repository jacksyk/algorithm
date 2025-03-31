/**
 * @url https://leetcode.cn/problems/combinations/description/
 */

// TODO:后期关于回溯的题目，统一看看是否能够剪枝。

function combine(n: number, k: number): number[][] {
    const result: Array<Array<number>> = []
    const traceBacking = (idx: number, acc: number[]) => {
        if (acc.length === k) {
            result.push(acc)
            return
        }

        for (let i = idx; i <= n; i++) {
            acc.push(i)
            traceBacking(i + 1, acc.concat([]))
            acc.pop()
        }
    }
    traceBacking(1, [])
    return result
}
