/**
 * @url https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    return [searchFirst(nums, target), searchLast(nums, target)]
};

/** 搜索第一个元素 */
var searchFirst = function (nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) {
            if (mid === 0 || nums[mid - 1] !== nums[mid]) {
                return mid
            } else {
                right = mid - 1
            }
        }
        if (nums[mid] < target) {
            left = mid + 1
        }
        if (nums[mid] > target) {
            right = mid - 1
        }
    }
    return -1
}

/** 搜索最后一个元素 */
var searchLast = function (nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) {
            if (mid === nums.length - 1 || nums[mid] !== nums[mid + 1]) {
                return mid
            } else {
                left = mid + 1
            }
        }
        if (nums[mid] < target) {
            left = mid + 1
        }
        if (nums[mid] > target) {
            right = mid - 1
        }
    }
    return -1
}