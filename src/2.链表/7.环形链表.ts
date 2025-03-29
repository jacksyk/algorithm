/**
 * @url https://leetcode.cn/problems/linked-list-cycle-ii/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}
function detectCycle(head: ListNode | null): ListNode | null {
    let slow: ListNode | null = head,
        fast: ListNode | null = head
    while (slow && fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) {
            // 这个时候是相遇点
            slow = head
            while (slow !== fast) {
                slow = slow!.next
                fast = fast!.next
            }
            return slow
        }
    }
    return null
}
