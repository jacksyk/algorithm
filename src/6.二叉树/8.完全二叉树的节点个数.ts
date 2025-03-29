/**
 * @url https://leetcode.cn/problems/count-complete-tree-nodes/description/
 * @videoUrl https://www.bilibili.com/video/BV1eW4y1B7pD/?spm_id_from=333.788&vd_source=1c79b7395f5d242a2f6786026aac6213
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

// TODO:完全二叉树和满二叉树的概念

function countNodes(root: TreeNode | null): number {
    if (!root) {
        // console.log(leftDepth, rightDepth)
        return 0
    }

    let left = root.left,
        right = root.right,
        leftDepth = 1,
        rightDepth = 1
    while (left) {
        left = left.left
        leftDepth++
    }
    while (right) {
        right = right.right
        rightDepth++
    }
    if (leftDepth === rightDepth) {
        if (leftDepth !== 1) {
            return 2 ** leftDepth - 1
        }
        return 1
    }

    return 1 + countNodes(root.left) + countNodes(root.right)
}

// let root = new TreeNode(1)
// console.log(countNodes(root))
