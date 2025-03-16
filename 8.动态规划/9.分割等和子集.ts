/**
 * @url https://leetcode.cn/problems/partition-equal-subset-sum/description/
 */

// dp[i][j]表示从[0,i]个物品中选取，是否有一种方案恰好能够装满容量j。
// 提示：
// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100

// function canPartition(nums: number[]): boolean {
//     const target = nums.reduce((acc, cur) => acc + cur, 0) / 2
//     if (!Number.isInteger(target)) return false

//     const dp: boolean[][] = new Array(nums.length).fill(false).map((_arr) => new Array(target + 1).fill(false))

//     dp[0][nums[0]] = true

//     for (let row = 0; row < nums.length; row++) {
//         dp[row][0] = true
//     }

//     for (let row = 1; row < nums.length; row++) {
//         for (let col = 1; col < target + 1; col++) {
//             if (col - nums[row] >= 0) {
//                 dp[row][col] = dp[row - 1][col] || dp[row - 1][col - nums[row]]
//             } else {
//                 dp[row][col] = dp[row - 1][col]
//             }
//         }
//     }

//     return dp[nums.length - 1][target]
// }

//TODO:优化 dp[j]表示是否有一种方案能够装满dp[j]
function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((acc, cur) => acc + cur);
  const capaticy = sum / 2;
  if (!Number.isInteger(capaticy)) {
    return false;
  }
  const dp: boolean[] = new Array(capaticy + 1).fill(false); // 数组下标和容量的差距

  dp[0] = true;
  for (let row = 0; row < nums.length; row++) {
    for (let col = capaticy; col >= nums[row]; col--) {
      dp[col] = dp[col] || dp[col - nums[row]];
    }
  }
  return dp[capaticy];
}
