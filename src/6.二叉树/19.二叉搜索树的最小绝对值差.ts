/**
 * @url https://leetcode.cn/problems/minimum-absolute-difference-in-bst/description/
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

function getMinimumDifference(root: TreeNode | null): number {
    let pre: TreeNode,
        res = Number.MAX_SAFE_INTEGER
    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return Number.MAX_SAFE_INTEGER
        dfs(root.left)
        if (pre) {
            res = Math.min(Math.abs(root.val - pre.val), res)
        }
        pre = root
        dfs(root.right)
        return res
    }
    return dfs(root)
}
