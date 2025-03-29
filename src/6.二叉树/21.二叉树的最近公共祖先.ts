/**
 * @url https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/
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

// notice:后序遍历将结果返回上去，最后返回最终结果！
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root) return null
    if (root === q || root === p) return root
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if (left && !right) {
        return left
    }
    if (!left && right) {
        return right
    }
    if (left && right) {
        return root
    }
    return null
}
