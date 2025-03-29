/**
 * @url https://leetcode.cn/problems/delete-node-in-a-bst/description/
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

// notice
// 总共有五种情况
// 叶子节点，直接删掉就可以
// 没有找到节点
// 删除的节点只有左孩子，没有右孩子
// 删除的节点只有右孩子，没有左孩子
// 删除的节点既有右孩子，也有左孩子
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;
  if (root.val === key) {
    if (!root.left && !root.right) {
      return null;
    }
    if (root.left && !root.right) {
      return root.left;
    }
    if (!root.left && root.right) {
      return root.right;
    }
    if (root.left && root.right) {
      let cur = root.right;
      while (cur.left) {
        cur = cur.left;
      }
      cur.left = root.left;
      return root.right;
    }
  }

  if (root.val > key) {
    root.left = deleteNode(root.left, key);
  } else {
    root.right = deleteNode(root.right, key);
  }
  return root;
}
