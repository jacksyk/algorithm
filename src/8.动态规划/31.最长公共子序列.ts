/**
 * @url https://leetcode.cn/problems/longest-common-subsequence/description/
 */

// dp[i][j] 表示text1以i-1为下标，text2以j-1为下标的最长公共子序列
// dp[i][j] = dp[i-1][j-1] + 1
// TODO:30,31再好好思索一下  连续性和不连续的区别， 可以通过思考下一个状态的依赖来思考变化
// - 状态被截断
// - 状态已经截断
// - 初始化和最长重复子数组不太一样
function longestCommonSubsequence(text1: string, text2: string): number {
  const dp = new Array(text1.length + 1)
    .fill(0)
    .map((_v) => new Array(text2.length + 1).fill(0));
  let res = Number.MIN_SAFE_INTEGER;
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      res = Math.max(res, dp[i][j]);
    }
  }

  return res;
}
longestCommonSubsequence("abc", "def");
