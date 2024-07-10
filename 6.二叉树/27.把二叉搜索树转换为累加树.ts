/**
 * @url https://leetcode.cn/problems/convert-bst-to-greater-tree/description/
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

// TODO:一种是维护全局的一个sum。代表累加的值   一种是用prev指针来指向上一个遍历的指针。
function convertBST(root: TreeNode | null): TreeNode | null {
    let sum = 0
    const dfs = (root: TreeNode | null) => {
        if (!root) return 0
        dfs(root.right)
        sum += root.val
        root.val = sum
        dfs(root.left)
    }
    dfs(root)
    return root
}

const rootArray = [1, 2, 3, 4, 5, 6, 7, 8]
const root = sortedArrayToBST(rootArray)
console.log(convertBST(root))
