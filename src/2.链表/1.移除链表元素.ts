/**
 * @url https://leetcode.cn/problems/remove-linked-list-elements/description/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
    if (!head) return null
    let vitrualHead = new ListNode(0)
    vitrualHead.next = head
    let fast: ListNode | null = head,
        slow = vitrualHead
    while (fast) {
        if (fast.val === val) {
            slow.next = fast.next
            fast = fast.next
        } else {
            slow = fast
            fast = fast.next
        }
    }
    return vitrualHead.next
}
