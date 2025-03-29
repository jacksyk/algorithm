/**
 * @url https://leetcode.cn/problems/permutations-ii/description/
 */
// 跟11比起来就是数层去重
function permuteUnique(nums: number[]): number[][] {
    const result: number[][] = []
    nums.sort((a, b) => a - b)
    const dfs = (path: number[], used: boolean[]) => {
        if (path.length === nums.length) {
            result.push(path)
            return
        }

        for (let i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue
            }
            if (used[i] === true) {
                continue
            }
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
