/**
 * @url https://leetcode.cn/problems/reverse-linked-list/description/
 */

function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return null
    if (!head.next) return head
    let pre: ListNode | null = null,
        last: ListNode | null = null,
        traverse: null | ListNode = head
    while (traverse) {
        last = traverse
        traverse = traverse.next // notice：链表注意操作的时候next节点指针是否被改变了
        last.next = pre
        pre = last
    }
    return last
}

// 1 2 3 4 5
