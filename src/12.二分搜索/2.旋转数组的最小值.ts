/**
 * @url https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/?envType=study-plan-v2&envId=top-100-liked
 */
/**
 * @param {number[]} nums
 * @return {number}
 */

// 4 5 1 2 3

var findMin = function (nums) {
    let l = 0, r = nums.length - 1

    while (l <= r) {
        const mid = Math.floor((l + r) / 2)
        if (nums[mid] < nums[r]) {
            r = mid
        } else {
            l = mid + 1
        }
    }
    return nums[r]
};