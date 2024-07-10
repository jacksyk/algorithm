/**
 * @url https://leetcode.cn/problems/trim-a-binary-search-tree/description/
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
// TODO: 如果直接返回左右子树的话，没有考虑左右子树里面还有不符合条件的子树
/**
 * 沿用上一题的思路稍微改一下就可以了。上一题只需要删除一个结点,然后直接return,导致其下面还符合条件的结点没法删除。原因是因为上一题实
   际上是个先序遍历,符合条件直接return,如果我们改为后序遍历就可以了,每次判定都会是最底下的结点先判定,也就是把判断的代码写到递归代码  
   的后面。
 */
function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
    if (!root) return null

    root.left = trimBST(root.left, low, high)
    root.right = trimBST(root.right, low, high)

    if (root.val < low || root.val > high) {
        if (!root.left && !root.right) {
            return null
        }
        if (root.left && !root.right) {
            return root.left
        }
        if (!root.left && root.right) {
            return root.right
        }
        if (root.left && root.right) {
            let cur = root.right
            while (cur.left) {
                cur = cur.left
            }
            cur.left = root.left
            return root.right
        }
    }

    return root
}
