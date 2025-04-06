/**
 * @url https://leetcode.cn/problems/sort-list/description/?envType=study-plan-v2&envId=top-100-liked
 */
// @ts-nocheck

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 先拆，再和
var sortList = function(head) {
    if (!head) return null
    if (!head.next) return head
    let slow = head, fast = head.next
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    const postHead = slow.next
    slow.next = null
    let left = sortList(head)
    let right = sortList(postHead)

    const _Vnode = new ListNode(0)
    let fastVnode = _Vnode
    while (left && right) {
        if (left.val < right.val) {
            fastVnode.next = left
            left = left.next
        }else {
            fastVnode.next = right
            right = right.next
        }
        fastVnode = fastVnode.next
    }
    if (left) {
        fastVnode.next = left
    }
    if (right) {
        fastVnode.next = right
    }
    return _Vnode.next
};
