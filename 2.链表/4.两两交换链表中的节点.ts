/**
 * @url https://leetcode.cn/problems/swap-nodes-in-pairs/description/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}

function swapPairs(head: ListNode | null): ListNode | null {
    if (!head) return null
    if (!head.next) return head
    let prev: null | ListNode = null,
        last: null | ListNode = null,
        newHead: ListNode | null = new ListNode(0, null),
        curNode: ListNode | null = null
    newHead.next = head
    curNode = newHead

    while (curNode.next && curNode.next.next) {
        prev = curNode.next
        last = curNode.next.next
        let tempNode = last.next
        last.next = prev
        curNode.next = last
        prev.next = tempNode
        curNode = prev
    }
    return newHead.next
}

// notice 要思考一个节点换位后前后关联的关系
