/**
 * @url https://leetcode.cn/problems/house-robber-iii/description/
 */
export {} // 表明是一个模块，防止ts报错

// TODO:树形dp，与数组的区别是定义每个节点的一个状态
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

function rob(root: TreeNode | null): number {}
