/**
 * @url https://leetcode.cn/problems/path-sum/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    const dfs = (root: TreeNode | null, sum) => {
        if (!root) {
            // 这里返回什么都无所谓，主要是return 掉
            return 0
        }
        if (!root.left && !root.right) {
            sum += root.val
            if (sum === targetSum) {
                return true
            } else {
                return false
            }
        }

        return dfs(root.left, sum + root.val) || dfs(root.right, sum + root.val)
    }
    return dfs(root, 0)
}
