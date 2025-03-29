/**
 * @url https://leetcode.cn/problems/permutations/description/
 */
// TODO：组合问题是通过startIndex来取下标的，排列问题是通过used数组来取的
function permute(nums: number[]): number[][] {
    const result: number[][] = []
    const dfs = (path: number[], used: boolean[]) => {
        if (path.length === nums.length) {
            result.push(path)
            return
        }
        for (let i = 0; i < nums.length; i++) {
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
