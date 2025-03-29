// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/trapping-rain-water/description/
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const stack = []; // 维护一个单调递增的序列
  let res = 0; // 表示结果
  for (let i = 0; i < height.length; i++) {
    if (!stack.length) {
      stack.push(i);
    } else {
      while (stack.length && height[i] > height[stack[stack.length - 1]]) {
        const mid = height[stack.pop()];
        if (stack.length) {
          const leftIdx = stack[stack.length - 1];
          const leftVal = height[leftIdx];
          const rightVal = height[i];
          res += (i - leftIdx - 1) * (Math.min(leftVal, rightVal) - mid);
        }
      }
      stack.push(i); // 理解为计算以当前元素为底的情况
    }
  }
  return res;
};
