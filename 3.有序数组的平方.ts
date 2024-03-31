function sortedSquares(nums: number[]): number[] {
    let left = 0,
        right = nums.length - 1,
        result: Array<number> = []
    while (left <= right) {
        if (Math.pow(nums[left], 2) < Math.pow(nums[right], 2)) {
            result.unshift(Math.pow(nums[right], 2))
            right--
        } else {
            result.unshift(Math.pow(nums[left], 2))
            left++
        }
    }
    return result
}
