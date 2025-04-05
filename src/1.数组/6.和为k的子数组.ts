/**
 * @url https://leetcode.cn/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-100-liked
 */

// ps: 因为没有正负数，所以遍历所有的子数组
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    let count = 0
    for (let i = 0; i < nums.length; i++) {
        let fast = i, sum = 0
        while (fast < nums.length) {
            sum += nums[fast]
            fast++
            if (sum === k) {
                count++
            }
        }
    }
    return count
};