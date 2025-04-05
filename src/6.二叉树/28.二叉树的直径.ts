/**
 * @url https://leetcode.cn/problems/diameter-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked 
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    let res = 0
    const dfs = (root) => {
        if (!root) return 0
        if (!root.left && !root.right) return 1
        const lDepth = dfs(root.left)
        const rDepth = dfs(root.right)
        res = Math.max(res, lDepth + rDepth)
        return Math.max(lDepth, rDepth) + 1
    }
    dfs(root)
    return res
};