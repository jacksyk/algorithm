/**
 * @url https://leetcode.cn/problems/insert-into-a-binary-search-tree/description/
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
// function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
//     const dfs = (root: TreeNode | null, val: number) => {
//         if (!root) {
//             return
//         }
//         if (!root.left && !root.right) {
//             // TODO:这样没有返回值的算法，会丢失掉左子树全为空的情况
//             if (root.val > val) {
//                 root.left = new TreeNode(val)
//             } else {
//                 root.right = new TreeNode(val)
//             }
//             return null
//         }
//         if (root.val > val) {
//             dfs(root.left, val)
//         }
//         if (root.val < val) {
//             dfs(root.right, val)
//         }
//     }
//     if (!root) return new TreeNode(val)
//     dfs(root, val)
//     return root
// }
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// //========
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  const dfs = (root) => {
    if (!root) return new TreeNode(val);
    if (root.val > val) {
      const left = dfs(root.left);
      root.left = left;
    } else {
      const right = dfs(root.right);
      root.right = right;
    }
    return root;
  };
  return dfs(root);
};
