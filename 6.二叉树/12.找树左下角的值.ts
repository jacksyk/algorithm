/**
 * @url https://leetcode.cn/problems/find-bottom-left-tree-value/description/
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

function findBottomLeftValue(root: TreeNode | null): number {
    let maxDepth = Number.MIN_SAFE_INTEGER,
        res
    const dfs = (root: TreeNode | null | undefined, depth) => {
        if (!root) return -1
        if (!root.left && !root.right) {
            if (maxDepth < depth) {
                maxDepth = depth
                res = root.val
                return
            }
        }
        dfs(root.left, depth + 1)
        dfs(root.right, depth + 1)
    }
    dfs(root, 1)
    return res
}
