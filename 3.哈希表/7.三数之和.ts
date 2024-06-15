/**
 * @url https://leetcode.cn/problems/3sum/description/
 */
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b)
    let res: Array<Array<number>> = []
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) {
            return res
        }
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        let left = i + 1
        let right = nums.length - 1
        while (right > left) {
            let sum = nums[i] + nums[left] + nums[right]

            if (sum < 0) {
                left++
            }
            if (sum > 0) {
                right--
            }
            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]])
                while (nums[right] === nums[right - 1]) {
                    right--
                }
                while (nums[left] === nums[left + 1]) {
                    left++
                }
                // todo:找到了需要同时收缩
                right--
                left++
            }
        }
    }
    return res
}

// notice：固定两边移动之间是可以覆盖全的，排列组合计算方式
// todo:难点，关于找到后去重
