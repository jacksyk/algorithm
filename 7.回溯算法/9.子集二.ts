/**
 * @url function subsetsWithDup(nums: number[]): number[][] {}
 */
function subsetsWithDup(nums: number[]): number[][] {
    const result: number[][] = []
    const used: boolean[] = new Array(nums.length).fill(false)
    nums.sort((a, b) => a - b)
    const dfs = (path: number[], startIdx: number) => {
        result.push(path)
        if (startIdx >= nums.length) {
            return
        }
        for (let i = startIdx; i < nums.length; i++) {
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue
            }
            used[i] = true
            path.push(nums[i])
            dfs(path.concat(), i + 1)
            used[i] = false
            path.pop()
        }
    }
    dfs([], 0)
    return result
}
