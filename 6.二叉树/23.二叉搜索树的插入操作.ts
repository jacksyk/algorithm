/**
 * @url https://leetcode.cn/problems/insert-into-a-binary-search-tree/description/
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
// function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
//     const dfs = (root: TreeNode | null, val: number) => {
//         if (!root) {
//             return
//         }
//         if (!root.left && !root.right) {
//             // TODO:这样没有返回值的算法，会丢失掉左子树全为空的情况
//             if (root.val > val) {
//                 root.left = new TreeNode(val)
//             } else {
//                 root.right = new TreeNode(val)
//             }
//             return null
//         }
//         if (root.val > val) {
//             dfs(root.left, val)
//         }
//         if (root.val < val) {
//             dfs(root.right, val)
//         }
//     }
//     if (!root) return new TreeNode(val)
//     dfs(root, val)
//     return root
// }

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    let parentNode: TreeNode | null
    const dfs = (root: TreeNode | null) => {
        if (!root) {
            if (parentNode) {
                if (parentNode!.val > val) {
                    parentNode!.left = new TreeNode(val)
                } else {
                    parentNode!.right = new TreeNode(val)
                }
            }
            return
        }
        parentNode = root
        if (root.val > val) {
            dfs(root.left)
        } else {
            dfs(root.right)
        }
    }
    if (!root) {
        return new TreeNode(val)
    }
    dfs(root)
    return root
}
