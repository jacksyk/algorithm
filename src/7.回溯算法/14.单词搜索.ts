/**
 * @url https://leetcode.cn/problems/word-search/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

var exist = function (board, word) {
    const dfs = (r, c, wordIdx) => {
        // 越界或者字符不匹配，直接return false
        if (r >= board.length || c >= board[0].length || r < 0 || c < 0 || board[r][c] !== word[wordIdx]) {
            return false
        }
        if (wordIdx === word.length - 1) return true
        // 四个方向
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        const tmp = board[r][c]
        board[r][c] = '#'

        for (let direction of directions) {
            if (dfs(r + direction[0], c + direction[1], wordIdx + 1)) return true
        }
        board[r][c] = tmp
        return false
    }

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            if (dfs(r, c, 0)) {
                return true
            }
        }
    }
    return false
};