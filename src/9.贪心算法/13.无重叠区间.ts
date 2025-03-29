/**
 * @url https://leetcode.cn/problems/non-overlapping-intervals/description/
 */
// 本题和上题的区别就是求重叠区间的最小个数
// notice：因为是排序之后，所以只需要关注右边界
// TODO:思考一下边界情况,怎么去判断的。
function eraseOverlapIntervals(intervals: number[][]): number {
    intervals.sort((a, b) => a[0] - b[0])

    let count = 0,
        rightInterval = intervals[0][1]

    for (let i = 1; i < intervals.length; i++) {
        // 左边界小于上一次的右边界，说明有一次的重叠区域
        if (intervals[i][0] < rightInterval) {
            console.log(intervals[i], rightInterval)
            count++
            rightInterval = Math.min(rightInterval, intervals[i][1])
        } else {
            rightInterval = intervals[i][1]
        }
    }
    return count
}

console.log(
    eraseOverlapIntervals([
        [1, 2],
        [2, 3],
        [3, 4],
        [-100, -2],
        [5, 7],
    ])
)
