/**
 * @url https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/
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

function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (nums.length === 0) return null
    let mid = Math.floor(nums.length / 2)
    let root = new TreeNode(nums[mid])
    root.left = sortedArrayToBST(nums.slice(0, mid))
    root.right = sortedArrayToBST(nums.slice(mid + 1))
    return root
}
