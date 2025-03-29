/**
 * @url https://leetcode.cn/problems/4sum/
 */
// 这里的不重复是指值不能重复
// 2 2 2 1 1
function fourSum(nums: number[], target: number): number[][] {
    const res: number[][] = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i - 1] === nums[i]) {
            continue
        }
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue // 如果是初始给过滤，那么将不会获取到这个值
            let left = j + 1,
                right = nums.length - 1
            while (left < right) {
                let sum = nums[left] + nums[right] + nums[i] + nums[j]
                if (sum === target) {
                    res.push([nums[left], nums[right], nums[i], nums[j]])
                    while (nums[left] === nums[left + 1]) {
                        left++
                    }
                    while (nums[right] === nums[right - 1]) {
                        right--
                    }
                    left++
                    right--
                } else if (sum > target) {
                    right--
                } else {
                    left++
                }
            }
        }
    }
    return res
}

// -2 -1 0 0 1 2
