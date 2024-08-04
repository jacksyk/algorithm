/**
 * @url https://leetcode.cn/problems/merge-intervals/description/
 */

// 示例 1：

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]) // 先排序最左边
    let rightIndex = intervals[0][1], // 记录右区间
        leftIndex = intervals[0][0],
        res: number[][] = []

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= rightIndex) {
            // 说明区间被重合
            rightIndex = Math.max(rightIndex, intervals[i][1]) // 注意取最大区间
        } else {
            res.push([leftIndex, rightIndex])
            leftIndex = intervals[i][0]
            rightIndex = intervals[i][1]
        }
    }
    res.push([leftIndex, rightIndex])
    return res
}
