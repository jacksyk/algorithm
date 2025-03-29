/**
 * @url https://leetcode.cn/problems/validate-binary-search-tree/
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

// TODO:细节挺多的
function isValidBST(root: TreeNode | null): boolean {
    let last: TreeNode
    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return true
        const left = dfs(root.left)
        if (last && root.val <= last.val) return false
        last = root
        const right = dfs(root.right)
        return left && right
    }
    return dfs(root)
}
