/**
 * @url https://leetcode.cn/problems/permutations-ii/description/
 */
// 跟11比起来就是数层去重
function permuteUnique(nums: number[]): number[][] {
    const result: number[][] = []
    const dfs = (path: number[], used: boolean[]) => {
        if (path.length === nums.length) {
            result.push(path)
            return
        }
        const set: Set<number> = new Set()
        for (let i = 0; i < nums.length; i++) {
            if (set.has(nums[i])) {
                continue
            }
            if (used[i] === true) {
                continue
            }
            set.add(nums[i])
            path.push(nums[i])
            used[i] = true
            dfs(path.concat([]), used)
            path.pop()
            used[i] = false
        }
    }
    dfs([], new Array(nums.length).fill(false))
    return result
}
