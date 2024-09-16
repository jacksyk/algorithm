/**
 * @url https://leetcode.cn/problems/balanced-binary-tree/description/
 * @videoUrl https://www.bilibili.com/video/BV1Ug411S7my/?spm_id_from=333.788&vd_source=1c79b7395f5d242a2f6786026aac6213
 */

// TODO:准备二刷了（高度和深度的理解）
// 这题只能求高度
function isBalanced(root: TreeNode | null): boolean {
    const dfs = (root: TreeNode | null) => {
        if (!root) return 0
        // notice:单层递归的逻辑
        let leftHeight = dfs(root.left)
        if (leftHeight === -1) {
            return -1
        }
        let rightHeight = dfs(root.right)
        if (rightHeight === -1) {
            return -1
        }
        return Math.abs(leftHeight - rightHeight) > 1 ? -1 : Math.max(leftHeight, rightHeight) + 1
    }
    if (!root) return true
    return dfs(root) !== -1
}
