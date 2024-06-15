/**
 * @url https://leetcode.cn/problems/4sum/
 */
function fourSum(nums: number[], target: number): number[][] {
    let res: Array<Array<number>> = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue
            }
            let left = j + 1,
                right = nums.length - 1
            while (right > left) {
                let sum = nums[left] + nums[right] + nums[i] + nums[j]
                if (sum < target) {
                    left++
                }
                if (sum > target) {
                    right--
                }
                if (sum === target) {
                    res.push([nums[left], nums[right], nums[i], nums[j]])
                    while (right > left && nums[right] === nums[right - 1]) {
                        right--
                    }
                    while (right > left && nums[left] === nums[left + 1]) {
                        left++
                    }
                    right--
                    left++
                }
            }
        }
    }
    return res
}

// -2 -1 0 0 1 2
