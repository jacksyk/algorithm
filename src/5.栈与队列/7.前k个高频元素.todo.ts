// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/top-k-frequent-elements/description/
 */
// ps：基于堆，根据频率数量实现优先级队列
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
class MaxHeap {
    constructor() {
        this.heap = [] // [num, count]
    }
    getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }

    getLeftChildren(index) {
        return 2 * index + 1
    }

    getRightChildren(index) {
        return 2 * index + 2
    }

    shiftUp(index) {
        if (index === 0) return
        const parentIdx = this.getParentIndex(index)
        if (this.heap[index][1] > this.heap[parentIdx][1]) {
            this.swap(index, parentIdx)
            this.shiftUp(parentIdx)
        }
    }

    shiftDown(index) {

        const leftChildIndex = this.getLeftChildren(index)
        const rightChildIndex = this.getRightChildren(index)
        if (leftChildIndex >= this.heap.length) return // 如果左子节点不存在，说明是叶子节点

        let largest = index
        // 先比较左子节点
        if (this.heap[leftChildIndex][1] > this.heap[largest][1]) {
            largest = leftChildIndex
        }
        // 再比较右子节点（如果存在的话）
        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex][1] > this.heap[largest][1]) {
            largest = rightChildIndex
        }

        if (largest !== index) {
            this.swap(index, largest)
            this.shiftDown(largest)
        }
    }

    // 交换两个元素
    swap(left, right) {
        const leftVal = this.heap[left]
        this.heap[left] = this.heap[right]
        this.heap[right] = leftVal
    }

    insertNode(val) {
        this.heap.push(val)
        this.shiftUp(this.heap.length - 1)
    }

    peek() {
        if (this.heap.length === 0) return null
        const val = this.heap[0]
        this.heap[0] = this.heap[this.heap.length - 1]
        this.heap.pop()
        this.shiftDown(0)
        return val
    }
}


var topKFrequent = function (nums, k) {
    const map = new Map()

    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], (map.get(nums[i]) ?? 0) + 1)
    }
    console.log(map)

    const maxHeap = new MaxHeap()
    for (let [item, frequency] of map.entries()) {
        maxHeap.insertNode([item, frequency])
    }
    const res = []
    let count = 0
    while (count < k) {
        const top = maxHeap.peek()
        res.push(top[0])
        count++
    }

    return res
};