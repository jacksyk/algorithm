/**
 * @url https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/
 */

// TODO:有特殊case，单链表类型的特殊case
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

// 通过计算高度来算的
function minDepth(root: TreeNode | null): number {
    const dfs = (root: TreeNode | null) => {
        if (!root) return 0
        if (!root.left && root.right) {
            return 1 + dfs(root.right)
        }
        if (root.left && !root.right) {
            return 1 + dfs(root.left)
        }
        return 1 + Math.min(dfs(root.left), dfs(root.right))
    }
    return dfs(root)
}

// 通过深度来计算
function minDepthTwo(root: TreeNode | null): number {
    const dfs = (root: TreeNode | null, depth) => {
        if (!root) return 0
        if (!root.left && root.right) {
            return dfs(root.right, depth + 1)
        }
        if (root.left && !root.right) {
            return dfs(root.left, depth + 1)
        }
        return Math.min(dfs(root.left, depth + 1), dfs(root.right, depth + 1))
    }
    return dfs(root, 0)
}
