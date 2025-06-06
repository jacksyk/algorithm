/**
 * @url https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */

// ps: 专注以root为根节点
const rootSum = (root, targetSum) => {
    let res = 0
    if (!root) return res
    const val = root.val
    if (val === targetSum) {
        res++
    }
    res += rootSum(root.left, targetSum - val)
    res += rootSum(root.right, targetSum - val)
    return res
}

var pathSum = function(root, targetSum) {
    if (!root) return 0
    let res = rootSum(root, targetSum)
    res += pathSum(root.left, targetSum)
    res += pathSum(root.right, targetSum)
    return res
};