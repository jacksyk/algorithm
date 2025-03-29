// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/next-greater-element-ii/description/
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// !notice: 环形数组的一个遍历
var nextGreaterElements = function (nums) {
  const stack = [];
  const res = new Array(nums.length).fill(-1);
  for (let i = 0; i < nums.length * 2; i++) {
    const actualIdx = i % nums.length;
    if (!stack.length) {
      stack.push(actualIdx);
    } else {
      while (stack.length && nums[actualIdx] > nums[stack[stack.length - 1]]) {
        res[stack[stack.length - 1]] = nums[actualIdx];
        stack.pop();
      }
      stack.push(actualIdx);
    }
  }
  return res;
};
