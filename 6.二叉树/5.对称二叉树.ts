/**
 * @url https://leetcode.cn/problems/symmetric-tree/description/
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

function isSymmetric(root: TreeNode | null): boolean {
    if (!root) return true
    const specialTag = (root.left && !root.right) || (!root.right && root.left)
    if (specialTag) {
        return false
    }
    if (!root.left && !root.right) {
        return true
    }
    if (root.left && root.right) {
        if (root.left.val !== root.right.val) return false
        if (root.left.left?.val !== root.right.right?.val) return false
        if (root.left.right?.val !== root.right.left?.val) return false
        return true
    }
    return true
}
