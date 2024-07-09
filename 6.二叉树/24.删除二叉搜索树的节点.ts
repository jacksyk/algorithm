/**
 * @url https://leetcode.cn/problems/delete-node-in-a-bst/description/
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

// 如果是叶子节点，直接删掉就可以
// 如果不是叶子节点，
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {}
