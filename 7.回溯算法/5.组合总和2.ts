/**
 * @url https://leetcode.cn/problems/combination-sum-ii/description/
 */
// TODO:难点去重
function combinationSum2(candidates: number[], target: number): number[][] {
    const result: Array<Array<number>> = []
    const used: Array<boolean> = new Array(candidates.length).fill(false)
    candidates.sort((a, b) => a - b)
    const dfs = (path: number[], startIdx: number) => {
        const sum = path.reduce((a, b) => a + b, 0)
        if (sum > target) {
            return
        }
        if (sum === target) {
            result.push(path)
            return
        }
        for (let i = startIdx; i < candidates.length; i++) {
            if (i > 0 && candidates[i] === candidates[i - 1] && !used[i - 1]) {
                continue
            }
            path.push(candidates[i])
            used[i] = true
            dfs(path.concat([]), i + 1)
            path.pop()
            used[i] = false
        }
    }
    dfs([], 0)
    return result
}
