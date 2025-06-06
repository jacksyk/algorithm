// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
export {};
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
//  v 1 1
var removeNthFromEnd = function (head, n) {
  const Vnode = new ListNode(0, head);
  let fast = Vnode;
  let count = 0;
  while (count < n) {
    fast = fast.next;
    count++;
  }
  let slow = Vnode;
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return Vnode.next;
};
