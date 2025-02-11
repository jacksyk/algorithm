/**
 * @url https://leetcode.cn/problems/reverse-nodes-in-k-group/
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// 传入头结点，返回反转后的尾节点和头结点
const reverse = (head) => {
    let p = null, fast = head
    const tail = head
    while(fast) {
        const tmp = fast
        fast = fast.next
        tmp.next = p
        p = tmp
    }
    // 头结点和尾结点
    return [p, tail]
}
var reverseKGroup = function(head, k) {
    let VNode = new ListNode(0)
    VNode.next = head
    let p = VNode
    // 直到遍历完成
    while(p) {
        let head = p
        let count = 0;
        // 到达当前链表的末尾节点
        while(count < k && p) {
            p = p.next
            count++
        }
        // 说明这一组需要进行反转了
        if (count === k) {
            if (p) {
                const pNext = p.next
                p.next = null // 这里主动断开
                const [returnHead, returnTail] = reverse(head.next, p)
                returnTail.next = pNext
                head.next = returnHead
                p = returnTail
            }
        }
    }

    return VNode.next
};