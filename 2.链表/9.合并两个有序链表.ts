/**
 * @url https://leetcode.cn/problems/merge-two-sorted-lists/description/
 */
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}

// 分而治之中的治
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    let _vitrual = new ListNode(0) // 虚拟头结点
    let cur1 = list1,
        cur2 = list2,
        _head = _vitrual

    while (cur1 && cur2) {
        if (cur1.val < cur2.val) {
            _head.next = cur1
            cur1 = cur1.next
            _head = _head.next
        } else {
            _head.next = cur2
            cur2 = cur2.next
            _head = _head.next
        }
    }
    if (cur1) {
        _head.next = cur1
        cur1 = cur1.next
    }
    if (cur2) {
        _head.next = cur2
        cur2 = cur2.next
    }
    return _vitrual.next
}
