/**
 * @url https://leetcode.cn/problems/reverse-linked-list/description/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}
function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return null
    let pre = head,
        qo = head,
        fast = head.next
    while (fast && fast.next) {
        qo = fast
        fast = fast.next
        qo.next = pre
        pre = qo
    }
    return fast
}

// 1 2 3 4 5
