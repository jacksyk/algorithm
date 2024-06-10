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
    if (!head) return head
    let newHead = new ListNode(0)
    newHead.next = head
    let slowPoint: null | ListNode = newHead,
        fastPoint: null | ListNode = newHead.next
    while (fastPoint && slowPoint) {
        if (fastPoint.val === val) {
            slowPoint.next = fastPoint.next
            fastPoint = fastPoint.next
        } else {
            slowPoint = slowPoint.next
            fastPoint = fastPoint.next
        }
    }
    return newHead.next
}
