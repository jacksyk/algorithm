/**
 * @url https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// ps: 前缀积
var productExceptSelf = function (nums) {
    const prefixArr = new Array(nums.length).fill(1)
    const postfixArr = new Array(nums.length).fill(1)
    let prefix = 1
    for (let i = 0; i < nums.length; i++) {
        prefixArr[i] = prefix
        prefix *= nums[i]
    }
    let postfix = 1
    for (let i = nums.length - 1; i >= 0; i--) {
        postfixArr[i] = postfix
        postfix *= nums[i]
    }
    for (let i = 0; i < nums.length; i++) {
        nums[i] = prefixArr[i] * postfixArr[i]
    }
    return nums
};