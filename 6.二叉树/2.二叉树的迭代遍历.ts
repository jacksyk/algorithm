/**
 * @description 迭代遍历
 * @url url是1中的
 */

// notice:处理节点和遍历节点

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

let root = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null))

/** 前序遍历 */
function preorderTraversal(root: TreeNode | null): number[] {
    let stack: Array<TreeNode | null> = [],
        result: number[] = []
    if (!root) return result
    stack.push(root)
    while (stack.length) {
        let top = stack.pop()
        if (top) {
            result.push(top.val)
            stack.push(top.right)
            stack.push(top.left)
        }
    }
    return result
}

/** 中序遍历 */
// 左中右
// TODO:可以再来尝试一下
function inorderTraversal(root: TreeNode | null): number[] {
    let stack: Array<TreeNode | null> = [],
        result: number[] = []
    if (!root) return result
    while (root || stack.length !== 0) {
        if (root) {
            stack.push(root)
            root = root?.left
        } else {
            let node = stack.pop()
            root = node || null
            if (node) {
                result.push(node.val)
            }
            root = root?.right || null
        }
    }

    return result
}

/** 后续遍历 */
// TODO:先写前序，改变前序的顺序，然后反转前序遍历的数组
function postorderTraversal(root: TreeNode | null): number[] {
    let stack: Array<TreeNode | null> = [],
        result: number[] = []
    if (!root) return result
    stack.push(root)
    while (stack.length) {
        let top = stack.pop()
        if (top) {
            result.push(top?.val)
            stack.push(top.left)
            stack.push(top.right)
        }
    }
    return result.reverse()
}
