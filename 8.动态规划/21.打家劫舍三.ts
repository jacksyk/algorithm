/**
 * @url https://leetcode.cn/problems/house-robber-iii/description/
 */
export {} // 表明是一个模块，防止ts报错

// TODO:树形dp，与数组的区别是定义每个节点的一个状态
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

// dp[0]表示当前节点未偷 dp[1]表示当前节点已经被偷
// function rob(root: TreeNode | null): number {
//     const traverse = (root: TreeNode | null): Array<number> => {
//         const dp: number[] = new Array(2).fill(0)

//         if (!root) return dp.concat([])
//         if (!root.left && !root.right) {
//             dp[1] = root.val
//             return dp.concat()
//         }
//         // 节点被偷
//         dp[1] = root.val + traverse(root.left)[0] + traverse(root.right)[0]

//         // 节点未被偷，但也不一定是会去子节点的最大值呀！！！！
//         dp[0] = traverse(root.left)[1] + traverse(root.right)[1]

//         return dp.concat([])
//     }

//     return Math.max(...traverse(root))
// }

function rob(root: TreeNode | null): number {
    const traverse = (root: TreeNode | null): Array<number> => {
        const dp: number[] = new Array(2).fill(0)

        if (!root) return dp.concat([])
        if (!root.left && !root.right) {
            dp[1] = root.val
            return dp.concat()
        }

        // 后序遍历
        const left = traverse(root.left)
        const right = traverse(root.right)

        // 节点被偷
        dp[1] = root.val + left[0] + right[0]

        // 节点未被偷，但也不一定是会去子节点的最大值呀！！！！
        dp[0] = Math.max(...left) + Math.max(...right)

        return dp.concat([])
    }

    return Math.max(...traverse(root))
}
