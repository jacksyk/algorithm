/**
 * @url https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/
 */
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}
