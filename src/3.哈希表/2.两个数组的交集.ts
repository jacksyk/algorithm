/**
 * @url https://leetcode.cn/problems/intersection-of-two-arrays/description/
 */

// notice：在add的时候就已经去重了
function intersection(nums1: number[], nums2: number[]): number[] {
    const set = new Set()
    const set1 = new Set()
    nums1.forEach((_num) => set.add(_num))
    nums2.forEach((_num) => {
        if (set.has(_num)) {
            set1.add(_num)
        }
    })
    return Array.from(set1) as number[]
}

