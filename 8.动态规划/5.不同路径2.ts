/**
 * @url https://leetcode.cn/problems/unique-paths-ii/description/
 */

// TODO:注意初始化的操作
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const dp = new Array(obstacleGrid.length)
    .fill(0)
    .map((_num) => new Array(obstacleGrid[0].length).fill(0)); // m * n 的二维数组
  if (obstacleGrid[0][0] === 1) return 0;
  const initDp = () => {
    for (let row = 0; row < obstacleGrid.length; row++) {
      if (obstacleGrid[row][0] === 1) {
        dp[row][0] = 0;
        break;
      } else {
        dp[row][0] = 1;
      }
    }
    for (let col = 0; col < obstacleGrid[0].length; col++) {
      if (obstacleGrid[0][col] === 1) {
        dp[0][col] = 0;
        break;
      } else {
        dp[0][col] = 1;
      }
    }
  };
  dp[0][0] = 0;
  initDp();

  for (let i = 1; i < obstacleGrid.length; i++) {
    for (let j = 1; j < obstacleGrid[0].length; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  console.log(dp);

  return dp[obstacleGrid.length - 1][obstacleGrid[0].length - 1];
}

// ! 暴力解法
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstaclesViolent = function (obstacleGrid) {
  // 如果起点或终点是障碍，直接返回0
  if (
    obstacleGrid[0][0] === 1 ||
    obstacleGrid[obstacleGrid.length - 1][obstacleGrid[0].length - 1] === 1
  ) {
    return 0;
  }

  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  let pathCount = 0;

  // 方向数组：向下和向右
  const directions = [
    [1, 0],
    [0, 1],
  ]; // [row, col]

  function backtrack(row, col) {
    // 到达终点，路径数加1
    if (row === m - 1 && col === n - 1) {
      pathCount++;
      return;
    }

    // 尝试每个方向
    for (let [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // 检查边界和障碍
      if (newRow < m && newCol < n && obstacleGrid[newRow][newCol] !== 1) {
        backtrack(newRow, newCol);
      }
    }
  }

  // 从起点开始
  backtrack(0, 0);
  return pathCount;
};

// 测试用例
console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ])
); // 输出 2

console.log(
  uniquePathsWithObstacles([
    [0, 1],
    [0, 0],
  ])
); // 输出 1
