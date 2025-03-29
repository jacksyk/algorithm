// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/reverse-nodes-in-k-group/
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

function ReverseHeadAndTail(head, tail) {
  let pre = null,
    cur = null,
    fast = head;
  while (fast !== tail) {
    cur = fast;
    fast = fast.next;
    cur.next = pre;
    pre = cur;
  }
  if (fast) {
    cur = fast;
    cur.next = pre;
  }
  return [cur, head];
}

var reverseKGroup = function (head, k) {
  const _VNode = new ListNode(0);
  _VNode.next = head;
  let fast = _VNode;
  while (fast) {
    let p = fast; // 翻转前的一个节点
    let count = 0;
    let tail = fast; // 要翻转链表的最后一个节点
    while (count < k && tail) {
      tail = tail.next;
      count++;
    }
    if (k === count && tail) {
      const tailNext = tail.next;
      tail.next = null;
      const [reverseHead, reverseTail] = ReverseHeadAndTail(p.next, tail);
      p.next = reverseHead;
      reverseTail.next = tailNext;
      fast = reverseTail;
    } else {
      break; // ps: 不足k个直接退出循环了。
    }
  }
  return _VNode.next;
};
