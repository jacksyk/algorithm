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
function detectCycle(head: ListNode | null): ListNode | null {}
