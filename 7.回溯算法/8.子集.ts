/**
 * @url https://leetcode.cn/problems/subsets/description/
 */
function subsets(nums: number[]): number[][] {
    const result: number[][] = []
    const dfs = (path: number[], startIdx: number) => {
        result.push(path)
        if (startIdx >= nums.length) {
            return
        }
        for (let i = startIdx; i < nums.length; i++) {
            path.push(nums[i])
            dfs(path.concat([]), i + 1)
            path.pop()
        }
    }
    dfs([], 0)
    return result
}
