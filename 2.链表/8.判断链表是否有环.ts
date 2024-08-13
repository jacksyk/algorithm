/**
 * @url https://leetcode.cn/problems/linked-list-cycle/description/
 */
export {}
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}
function hasCycle(head: ListNode | null): boolean {
    if (!head) return false
    if (!head.next) return false
    let slow: ListNode | null = head,
        fast: ListNode | null = head
    while (slow && fast) {
        slow = slow.next
        fast = fast.next?.next || null
        if (slow === fast) {
            return true
        }
    }
    return false
}
