class MinHeap {
    constructor() {
        /** 用数组来存储堆的形式 */
        this.heap = []
    }

    /** 交换两个节点的位置 */
    swap(i1, i2) {
        const temp = this.heap[i1]
        this.heap[i1] = this.heap[i2]
        this.heap[i2] = temp
    }

    /** 获取指定节点的父节点下标 */
    getParentIndex(i) {
        return Math.floor((i - 1) / 2)
    }

    /** 获取左孩子节点下标 */
    getLeftIndex(i) {
        return 2 * i + 1
    }

    /** 获取右孩子节点下标 */
    getRightIndex(i) {
        return 2 * i + 2
    }

    /** 上移操作 */
    shiftUp(index) {
        if (index === 0) {
            return
        }
        /** 父节点下标 */
        const parentIndex = this.getParentIndex(index)
        if (this.heap[index] < this.heap[parentIndex]) {
            this.swap(index, parentIndex)
            this.shiftUp(parentIndex)
        }
    }

    /** 下移操作 */
    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index)
        const rightIndex = this.getRightIndex(index)
        if (leftIndex >= this.heap.length) {
            return
        }
        if (rightIndex >= this.heap.length) {
            return
        }

        if (this.heap[index] > this.heap[leftIndex]) {
            this.swap(index, leftIndex)
            this.shiftDown(leftIndex)
        }
        if (this.heap[index] > this.heap[rightIndex]) {
            this.swap(index, rightIndex)
            this.shiftDown(rightIndex)
        }
    }

    /** 插入节点的值 */
    insertNode(val) {
        this.heap.push(val)
        this.shiftUp(this.heap.length - 1)
    }

    /** 去除栈顶元素  */
    pop() {
        this.heap[0] = this.heap.pop()
        this.shiftDown(0)
    }

    /** 获取栈顶元素 */
    peek() {
        return this.heap[0]
    }
}
const heap = new MinHeap()

const arr = [3, 1, 2, 3, 4, 1, 4, 2, 1, 2, 4, -1]
arr.forEach((item) => {
    heap.insertNode(item)
})
console.log(heap)
