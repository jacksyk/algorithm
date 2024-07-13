/**
 * @url https://leetcode.cn/problems/n-queens/description/
 */

function solveNQueens(n: number): string[][] {
    const final: string[][] = []
    const result: string[][] = new Array(n).fill(0).map((_v) => new Array(n).fill("."))

    const isValid = (row: number, col: number) => {
        // 检查列上是否有冲突
        for (let i = row; i >= 0; i--) {
            if (result[i][col] === "Q") {
                return false
            }
        }
        // 检查右上角上是否有冲突
        for (let i = row, j = col; i >= 0 && j >= 0; j--, i--) {
            if (result[i][j] === "Q") {
                return false
            }
        }
        // 检查左上角上是否有冲突
        for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (result[i][j] === "Q") {
                return false
            }
        }
        return true
    }

    const dfs = (row: number) => {
        if (row === n) {
            final.push(result.concat([]).map((_row) => _row.join("")))
            return
        }
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                result[row][col] = "Q"
                dfs(row + 1)
                result[row][col] = "."
            }
        }
    }
    dfs(0)
    return final
}

console.log(solveNQueens(4))
