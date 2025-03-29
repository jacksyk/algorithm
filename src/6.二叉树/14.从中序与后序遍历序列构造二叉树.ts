/**
 * @url https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 * @videoUrl https://www.bilibili.com/video/BV1vW4y1i7dn/?vd_source=1c79b7395f5d242a2f6786026aac6213
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
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (postorder.length === 0) return null
    let midValue = postorder.pop()
    const root = new TreeNode(midValue)
    let _index = inorder.indexOf(midValue!)
    root.left = buildTree(inorder.slice(0, _index), postorder.slice(0, _index)) // notice：注意中间节点需要去掉
    root.right = buildTree(inorder.slice(_index + 1), postorder.slice(_index))
    return root
}

/**
 * @description 从前序与中序遍历序列构造二叉树
 * @url https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 */
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) return null
    let _mid = preorder.shift() // notice:一定要注意！！！真的闹糊涂了
    let _root = new TreeNode(_mid)
    let _index = inorder.indexOf(_mid!)
    _root.left = buildTree(preorder.slice(0, _index), inorder.slice(0, _index))
    _root.right = buildTree(preorder.slice(_index), inorder.slice(_index + 1))
    return _root
}
