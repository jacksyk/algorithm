// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/longest-increasing-subsequence/description/
 */
// function lengthOfLIS(nums: number[]): number {}

// notice：找出所有的递增子序列,回溯法暴力搜索
// TODO:思考一下暴力搜索

// function lengthOfLIS(nums: number[]): number {
//     const res: number[][] = []
//     const dfs = (path: number[], startIndex: number) => {
//         const set: Set<number> = new Set()

//         if (path[path.length - 1] <= path[path.length - 2]) {
//             path.pop()
//             res.push(path.concat())
//             return
//         }
//         if (startIndex >= nums.length) {
//             res.push(path.concat())
//             return
//         }
//         for (let i = startIndex; i < nums.length; i++) {
//             if (set.has(nums[i])) {
//                 continue
//             }

//             path.push(nums[i])
//             set.add(nums[i])
//             dfs(path.concat(), i + 1)
//             path.pop()
//         }
//     }
//     const findMax = (arr: number[][]) => {
//         let max = Number.MIN_SAFE_INTEGER
//         arr.forEach((_v) => {
//             max = Math.max(_v.length, max)
//         })
//         return max
//     }
//     dfs([], 0)

//     return findMax(res)
// }

// console.log(lengthOfLIS([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]))

// TODO:动态规划
// dp[i]表示到达第i个位置所能获得的最长递增子序列
// dp[i] = dp[j]+1 nums[i] > nums[j]
function lengthOfLIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1); // 初始化的时候注意一点
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }
  return Math.max(...dp);
}
// console.log(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6]))


// ps: 如果要知道子序列是什么的做法
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findLIS = function(nums) {
  if (!nums.length) return [];
  
  // dp[i] 表示以 nums[i] 结尾的最长递增子序列长度
  const dp = new Array(nums.length).fill(1);
  // prev[i] 记录 dp[i] 从哪个位置 j 转移过来
  const prev = new Array(nums.length).fill(-1);
  
  // 动态规划计算 LIS 长度和前驱
  for (let i = 1; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
          if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
              dp[i] = dp[j] + 1;
              prev[i] = j;
          }
      }
  }
  
  // 找到 dp 中的最大值及其索引
  let maxLen = 1;
  let endIndex = 0;
  for (let i = 0; i < dp.length; i++) {
      if (dp[i] > maxLen) {
          maxLen = dp[i];
          endIndex = i;
      }
  }
  
  // 回溯构造子序列
  const result = [];
  while (endIndex !== -1) {
      result.push(nums[endIndex]);
      endIndex = prev[endIndex];
  }
  
  // 反转结果，因为回溯是从后向前
  return result.reverse();
};

