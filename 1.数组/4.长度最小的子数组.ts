/**
 * @url https://leetcode.cn/problems/minimum-size-subarray-sum/
 */
function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0,
        right = 0,
        sum = 0, // 计算滑动窗口总和，和target进行比较
        resultNum = Number.MAX_SAFE_INTEGER // 存贮结果数组的长度

    while (right < nums.length) {
        sum += nums[right]
        while (sum >= target) {
            resultNum = Math.min(resultNum, right - left + 1)
            sum -= nums[left]
            left++
        }

        right++
    }
    return resultNum === Number.MAX_SAFE_INTEGER ? 0 : resultNum
}
