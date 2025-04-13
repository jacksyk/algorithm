/**
 * @url https://leetcode.cn/problems/search-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// ps: 每一次二分都能找到一半有序，一半无序的情况。根据有序去缩写最小值

var search = function (nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return mid
        // ps: 落在左侧有序区间（左边是连续递增的）
        if (nums[left] <= nums[mid]) {
            // target 落在[left, mid]空间上
            if (nums[left] <= target && nums[mid] > target) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else {
            // 这里右侧空间是有序的，去判断右侧区间是否有序
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    return -1
};