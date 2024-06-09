/**
 * @url https://leetcode.cn/problems/squares-of-a-sorted-array/description/
 */
function sortedSquares(nums: number[]): number[] {
    let left = 0,
        right = nums.length - 1,
        result: Array<number> = []
    while (left <= right) {
        let leftPow = Math.pow(nums[left], 2)
        let rightRow = Math.pow(nums[right], 2)
        if (leftPow > rightRow) {
            result.unshift(leftPow)
            left++
        } else {
            result.unshift(rightRow)
            right--
        }
    }
    return result
}
