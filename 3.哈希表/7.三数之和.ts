/**
 * @url https://leetcode.cn/problems/3sum/description/
 */

// -1 -1 -1 0 1 2
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b)
    const res: number[][] = []
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue
        let left = i + 1,
            right = nums.length - 1
        while (left < right) {
            let sum = nums[left] + nums[right] + nums[i]

            if (sum === 0) {
                res.push([nums[left], nums[right], nums[i]])
                while (nums[left] === nums[left + 1]) {
                    left++
                }
                while (nums[right] === nums[right - 1]) {
                    right--
                }
                left++
                right--
            } else if (sum < 0) {
                left++
            } else {
                right--
            }
        }
    }

    return res
}

// notice：固定两边移动之间是可以覆盖全的，排列组合计算方式
// todo:难点，关于找到后去重
