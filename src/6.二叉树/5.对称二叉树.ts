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

// notice:compare比较单个单点的函数，然后比较左子树，右子树的节点

function isSymmetric(root: TreeNode | null): boolean {
    const compare = (left: TreeNode | null, right: TreeNode | null) => {
        const specialCondition = (left && !right) || (!left && right)
        const empty = !left && !right
        if (specialCondition) {
            return false
        }
        if (empty) {
            return true
        }
        if (left?.val !== right?.val) {
            return false
        }
        const inSide = compare(left!.left, right!.right)
        const outSide = compare(left!.right, right!.left)
        return inSide && outSide
    }
    if (!root) return true
    return compare(root.left, root.right)
}

/**
 * @description 相同的树
 * @url https://leetcode.cn/problems/same-tree/
 */
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    const compare = (p: TreeNode | null, q: TreeNode | null) => {
        // 比较单节点
        const special = (!p && q) || (p && !q)
        if (special) return false
        const isEmpty = !p && !q
        if (isEmpty) return true
        if (p?.val !== q?.val) return false
        // 比较子树
        return compare(p!.left, q!.left) && compare(p!.right, q!.right)
    }
    return compare(p, q)
}

/**
 * @description 另一个树的子树
 * @url https://leetcode.cn/problems/subtree-of-another-tree/description/
 */

// compare比较根节点相同的两个子树是否相同
const compare = (root: TreeNode | null, subRoot: TreeNode | null) => {
    const specialCondition = (root && !subRoot) || (!root && subRoot)
    const empty = !root && !subRoot
    if (specialCondition) {
        return false
    }
    if (empty) {
        return true
    }
    if (root?.val !== subRoot?.val) {
        return false
    }
    return compare(root!.left, subRoot!.left) && compare(root!.right, subRoot!.right)
}
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    // 对root进行dfs的遍历
    if (!root) return false
    return compare(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
}
