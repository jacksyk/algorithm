/**
 * @url https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/description/
 */

// 升序--> 处理最小公共区间，记录有多少区间
// notice:其实就是找非重叠区间的个数
function findMinArrowShots(points: number[][]): number {
    let count = 0,
        section = new Array(2).fill(0)

    points.sort((a, b) => a[0] - b[0])
    for (let i = 0; i < points.length; i++) {
        if (i === 0) {
            section[0] = points[i][0]
            section[1] = points[i][1]
            count++
            continue
        }
        if (points[i][0] > section[1]) {
            count++
            section[0] = points[i][0]
            section[1] = points[i][1]
        } else {
            section[0] = points[i][0]
            section[1] = Math.min(points[i][1], section[1])
        }
    }
    return count
}
