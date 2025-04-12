/**
 * @url https://leetcode.cn/problems/3sum/description/
 */

// notice：固定两边移动之间是可以覆盖全的，排列组合计算方式
// todo:难点，关于找到后去重
// -1 -1 -1 0 1 2
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b)
    const res: number[][] = []

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        let left = i + 1,
            right = nums.length - 1
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right]
            if (sum === 0) {
                while (nums[left] === nums[left + 1]) {
                    left++
                }
                while (nums[right] === nums[right - 1]) {
                    right--
                }
                res.push([nums[i], nums[left], nums[right]])
                right--
                left++
            } else if (sum < 0) {
                left++
            } else {
                right--
            }
        }
    }

    return res
}

// ps: 纯暴力解法
function threeSumViolent(nums: number[]): number[][] {
    nums.sort((a, b) => a - b)
    const seen = new Set<string>()
    const res: number[][] = []

    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] === 0) {
                    // 将三个数转换成字符串作为key，用于去重
                    const key = `${nums[i]},${nums[j]},${nums[k]}`
                    if (!seen.has(key)) {
                        seen.add(key)
                        res.push([nums[i], nums[j], nums[k]])
                    }
                }
            }
        }
    }

    return res
}


