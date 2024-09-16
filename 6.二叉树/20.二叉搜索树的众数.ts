/**
 * @url https://leetcode.cn/problems/find-mode-in-binary-search-tree/description/
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

// TODO:有坑
function findMode(root: TreeNode | null): number[] {
    let res: number[] = [],
        maxCount = Number.MIN_SAFE_INTEGER,
        prev: TreeNode | null | undefined,
        curCount = 0

    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return
        dfs(root.left)
        if (prev && root.val === prev.val) {
            curCount++
            if (curCount === maxCount) {
                res.push(root.val)
            } else if (curCount > maxCount) {
                res = []
                res.push(root.val)
                maxCount = curCount
            }
        } else {
            curCount = 1
        }
        if (!prev) {
            res.push(root.val)
        }
        prev = root

        dfs(root.right)
    }
    dfs(root)
    return res
}

// 构造二叉树
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    let _mid = preorder.shift() // notice:一定要注意！！！真的闹糊涂了
    if (preorder.length === 0) return null
    let _root = new TreeNode(_mid)
    let _index = inorder.indexOf(_mid!)
    _root.left = buildTree(preorder.slice(0, _index), inorder.slice(0, _index))
    _root.right = buildTree(preorder.slice(_index), inorder.slice(_index + 1))
    return _root
}

const root = buildTree([1, 2], [1, 2])
console.log(root)
