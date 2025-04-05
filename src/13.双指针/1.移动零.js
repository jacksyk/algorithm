/**
 * @url https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 0 1 0 3 12
// 1 0 0 3 12
// 1 3 0 0 12
// 1 3 12 0 0

var moveZeroes = function (nums) {
    let slow = 0, fast = 0
    while (fast < nums.length) {
        if (!nums[fast]) {
            fast++
            continue
        }
        [nums[slow], nums[fast]] = [nums[fast], nums[slow]]
        slow++
        fast++
    }
    return nums
};