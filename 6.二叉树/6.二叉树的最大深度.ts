/**
 * @description 递归法
 * @url https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/
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

// 自上而下求深度
function maxDepth(root: TreeNode | null): number {
    const dfs = (root, depth) => {
        if (!root) return depth
        return Math.max(dfs(root.left, depth + 1), dfs(root.right, depth + 1))
    }
    return dfs(root, 0)
}
// 自下而上求高度
function maxDepthDeep(root: TreeNode | null): number {
    const dfs = (root) => {
        if (!root) return 0
        return 1 + Math.max(dfs(root.left), dfs(root.right))
    }
    return dfs(root)
}
