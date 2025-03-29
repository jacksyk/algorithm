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
export {}

function swapPairs(head: ListNode | null): ListNode | null {
    if (!head) return null
    if (!head.next) return head
    let vitrualNode: ListNode | null = new ListNode(0)
    vitrualNode.next = head
    let cur: ListNode | null = vitrualNode
    while (cur && cur.next && cur.next.next) {
        let p = cur.next,
            q = cur.next.next
        p.next = q.next
        q.next = p
        cur.next = q
        cur = cur.next!.next
    }
    return vitrualNode.next
}

// notice 要思考一个节点换位后前后关联的关系
