function minSubArrayLen(target: number, nums: number[]): number {
    let slow = 0,
        fast = 0,
        sum = 0,
        min = Number.MAX_SAFE_INTEGER
    while (fast < nums.length) {
        sum += nums[fast]
        // if (sum >= target) {
        //     min = Math.min(min, fast - slow + 1)
        //     sum -= nums[slow]
        //     slow++
        // } else {
        //     fast++
        // }
        while (sum >= target) {
            min = Math.min(min, fast - slow + 1)
            sum -= nums[slow]
            slow++
        }
        fast++
    }
    return min === Number.MAX_SAFE_INTEGER ? 0 : min
}
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))
