/**
 * @description 前序遍历
 * @url https://leetcode.cn/problems/binary-tree-preorder-traversal/description/
 *
 * @description 中序遍历
 * @url https://leetcode.cn/problems/binary-tree-inorder-traversal/description/
 *
 * @description 后序遍历
 * @url https://leetcode.cn/problems/binary-tree-postorder-traversal/description/
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

/** 前序遍历 */
function preorderTraversal(root: TreeNode | null): number[] {
    let stack: number[] = []
    if (!root) return stack
    stack.push(root.val)
    stack.push(...preorderTraversal(root.left))
    stack.push(...preorderTraversal(root.right))
    return stack
}

/** 中序遍历 */
function inorderTraversal(root: TreeNode | null): number[] {
    let stack: number[] = []
    if (!root) return stack
    stack.push(...inorderTraversal(root.left))
    stack.push(root.val)
    stack.push(...inorderTraversal(root.right))
    return stack
}

/** 后续遍历 */
function postorderTraversal(root: TreeNode | null): number[] {
    let stack: number[] = []
    if (!root) return stack
    stack.push(...postorderTraversal(root.left))
    stack.push(...postorderTraversal(root.right))
    stack.push(root.val)
    return stack
}
