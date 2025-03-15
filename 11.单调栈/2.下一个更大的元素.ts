// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/next-greater-element-i/description/
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// !notice: 注意题目描述
var nextGreaterElement = function (nums1, nums2) {
  const stack = [];
  const map = new Map(); // key为值，value为下标
  const res = new Array(nums1.length).fill(-1);
  for (let i = 0; i < nums1.length; i++) {
    map.set(nums1[i], i);
  }

  for (let i = 0; i < nums2.length; i++) {
    if (!stack.length) {
      stack.push(i);
    } else {
      while (stack.length && nums2[i] > nums2[stack[stack.length - 1]]) {
        if (map.has(nums2[stack[stack.length - 1]])) {
          const idx = map.get(nums2[stack[stack.length - 1]]);
          res[idx] = nums2[i];
        }
        stack.pop();
      }
      stack.push(i);
    }
  }
  return res;
};
