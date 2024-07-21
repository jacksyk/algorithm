/**
 * @url https://leetcode.cn/problems/unique-paths-ii/description/
 */

// TODO:注意初始化的操作
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const dp = new Array(obstacleGrid.length).fill(0).map((_num) => new Array(obstacleGrid[0].length).fill(0)) // m * n 的二维数组
    if (obstacleGrid[0][0] === 1) return 0
    const initDp = () => {
        for (let row = 0; row < obstacleGrid.length; row++) {
            if (obstacleGrid[row][0] === 1) {
                dp[row][0] = 0
                break
            } else {
                dp[row][0] = 1
            }
        }
        for (let col = 0; col < obstacleGrid[0].length; col++) {
            if (obstacleGrid[0][col] === 1) {
                dp[0][col] = 0
                break
            } else {
                dp[0][col] = 1
            }
        }
    }
    dp[0][0] = 0
    initDp()

    for (let i = 1; i < obstacleGrid.length; i++) {
        for (let j = 1; j < obstacleGrid[0].length; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }
    console.log(dp)

    return dp[obstacleGrid.length - 1][obstacleGrid[0].length - 1]
}
