function search(nums: number[], target: number): number {
    let left = 0,
        right = nums.length - 1
    while (left <= right) {
        let midIndex = Math.floor((left + right) / 2)
        if (nums[midIndex] === target) return midIndex
        if (nums[midIndex] < target) {
            left = midIndex + 1
        } else {
            right = midIndex - 1
        }
    }
    return -1
}
