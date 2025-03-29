/**
 * @url https://leetcode.cn/problems/binary-tree-paths/description/
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
function binaryTreePaths(root: TreeNode | null): string[] {
    let path: Array<string> = []
    const dfs = (root: TreeNode | null | undefined, pathTempArray: Array<string>) => {
        if (!root) return
        pathTempArray.push(String(root?.val))

        if (!root?.left && !root?.right) {
            path.push(pathTempArray.join("->"))
            return
        }
        dfs(root?.left, pathTempArray.concat())
        dfs(root?.right, pathTempArray.concat())
    }
    dfs(root, [])
    return path
}
