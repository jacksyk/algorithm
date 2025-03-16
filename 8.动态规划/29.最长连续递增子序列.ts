// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/longest-continuous-increasing-subsequence/description/
 */

// dp[i]表示到第i个位置的连续子序列的长度
function findLengthOfLCIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = Math.max(dp[i - 1] + 1, dp[i]);
    }
  }
  return Math.max(...dp);
}

// ps:暴力解法如下

function lengthOfLIS(nums) {
  if (!nums || nums.length === 0) return 0;

  let maxLen = 0; // 全局变量，记录最长递增子序列长度

  function backtrack(index, currSeq) {
    // 更新最长长度
    maxLen = Math.max(maxLen, currSeq.length);

    // 从当前索引往后遍历
    for (let i = index; i < nums.length; i++) {
      // 如果当前元素可以加入递增子序列
      if (currSeq.length === 0 || nums[i] > currSeq[currSeq.length - 1]) {
        // 选择：加入当前元素
        currSeq.push(nums[i]);
        // 递归探索后续元素
        backtrack(i + 1, currSeq);
        // 回溯：撤销选择
        currSeq.pop();
      }
      // 不选择当前元素的情况会自动通过循环继续
    }
  }

  backtrack(0, []);
  return maxLen;
}
