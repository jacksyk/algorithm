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
export {}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let newHead = new ListNode(0, null)
    newHead.next = head
    let count = 0,
        curNode: ListNode | null = newHead,
        prev: ListNode | null = newHead
    while (count < n) {
        curNode = curNode?.next || null
        count++
    }
    while (curNode?.next) {
        prev = prev?.next || null
        curNode = curNode.next
    }
    if (prev) {
        prev.next = prev.next?.next || null // notice:注意这一步的操作
    }
    return newHead.next
}
