/**
 * @url https://leetcode.cn/problems/search-in-a-binary-search-tree/
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
// TODO:注意二叉搜索树的特性
/** 暴力法 */
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return null

        if (root.left) {
            const res = dfs(root.left)
            if (res) {
                return res
            }
        }

        if (root.val === val) {
            return root
        }
        if (root.right) {
            const res = dfs(root.right)
            if (res) {
                return res
            }
        }
        return null
    }
    return dfs(root)
}

/** 利用二叉搜索树的特性法 */
function searchBSTDeep(root: TreeNode | null, val: number): TreeNode | null {
    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return null

        if (root.val === val) {
            return root
        } else if (root.val < val && root.right) {
            const res = dfs(root.right)
            if (res) {
                return res
            }
        } else {
            if (root.left) {
                const res = dfs(root.left)
                if (res) {
                    return res
                }
            }
        }

        return null
    }
    return dfs(root)
}
