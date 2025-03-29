/**
 * @url https://leetcode.cn/problems/design-linked-list/
 * @description 实现 MyLinkedList 类：
  MyLinkedList() 初始化 MyLinkedList 对象。
   int get(int index) 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 。
   void addAtHead(int val) 将一个值为 val 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。
   void addAtTail(int val) 将一个值为 val 的节点追加到链表中作为链表的最后一个元素。
   void addAtIndex(int index, int val) 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。如果 index 等于链表的长度，那么该节点会被追加到链表的末尾。如果 index 比长度更大，该节点将 不会插入 到链表中。
   void deleteAtIndex(int index) 如果下标有效，则删除链表中下标为 index 的节点。
 */

class MyLinkedList {
    val: number
    next: null | MyLinkedList
    constructor(val: number, next: null | MyLinkedList) {
        this.val = val
        this.next = next
    }

    get(index: number): number {
        let count = 0,
            prev: MyLinkedList | null = this
        while (count <= index) {
            if (prev) {
                prev = prev.next
            }
            count++
        }
        if (prev) return prev.val
        return -1
    }

    addAtHead(val: number): void {
        let newHead = new MyLinkedList(val, this)
        this.next = newHead
    }

    addAtTail(val: number): void {
        let prev: MyLinkedList | null = this
        while (prev?.next) {
            prev = prev.next
        }
        let newHead = new MyLinkedList(val, null)
        prev.next = newHead
    }

    addAtIndex(index: number, val: number): void {
        let count = 0,
            prev: MyLinkedList | null = this,
            newHead = new MyLinkedList(val, null)
        while (count <= index) {
            if (prev) {
                prev = prev.next
            }
            count++
        }
        if (prev) {
            prev.next = newHead
        }
    }

    deleteAtIndex(index: number): void {
        let count = 0,
            prev: MyLinkedList | null = this
        while (count <= index - 1 && prev) {
            prev = prev.next
            count++
        }
        if (prev) {
            prev.next = !prev.next ? null : prev.next.next
        }
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
