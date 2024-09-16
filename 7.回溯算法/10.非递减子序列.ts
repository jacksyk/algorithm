/**
 * @url https://leetcode.cn/problems/non-decreasing-subsequences/description/
 */

// TODO:1.边界条件 2.去重逻辑 (不能排序之后用used数组进行去重，会打乱原数组的顺序。)3.用set来去重，在树层的地方判断
// 想要用used[i]去重，数组就必须要是有序的

function findSubsequences(nums: number[]): number[][] {
    const result: Array<Array<number>> = []
    const dfs = (path: number[], startIdx: number) => {
        if (path.length >= 2) {
            result.push(path)
        }
        if (startIdx >= nums.length) {
            return
        }
        const set: Set<number> = new Set()
        for (let i = startIdx; i < nums.length; i++) {
            if (nums[i] < path[path.length - 1]) {
                continue
            }
            if (set.has(nums[i])) {
                continue
            }
            set.add(nums[i])
            path.push(nums[i])
            dfs(path.concat([]), i + 1)
            path.pop()
        }
    }
    dfs([], 0)
    return result
}

function findSubsequences1(nums: number[]): number[][] {
    const res: number[][] = []
    const dfs = (startIdx: number, path: number[]) => {
        if (path.length >= 2) {
            res.push(path)
        }

        if (startIdx >= nums.length) {
            return
        }
        const set = new Set()

        for (let i = startIdx; i < nums.length; i++) {
            if (nums[i] < path[path.length - 1]) {
                continue
            }
            if (set.has(nums[i])) {
                continue
            }
            path.push(nums[i])
            set.add(nums[i])
            dfs(i + 1, [...path])
            path.pop()
        }
    }
    dfs(0, [])
    return res
}

console.log(findSubsequences1([1, 1, 1, 1, 1, 1]))
