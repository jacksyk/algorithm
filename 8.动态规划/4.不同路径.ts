/**
 * @url https://leetcode.cn/problems/unique-paths/description/
 */

function uniquePaths(m: number, n: number): number {
    const dp = new Array(m).fill(0).map((_num) => new Array(n).fill(0)) // m * n 的二维数组

    // TODO:注意这个是路径，不是走了多少步
    // const initDp = () => {
    //     for (let row = 0; row < m; row++) {
    //         dp[row][0] = row
    //     }
    //     for (let col = 0; col < n; col++) {
    //         dp[0][col] = col
    //     }
    // }

    const initDp = () => {
        for (let row = 0; row < m; row++) {
            dp[row][0] = 1
        }
        for (let col = 0; col < n; col++) {
            dp[0][col] = 1
        }
    }
    dp[0][0] = 0
    initDp()

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }

    return dp[m - 1][n - 1]
}

console.log(uniquePaths(3, 2))
