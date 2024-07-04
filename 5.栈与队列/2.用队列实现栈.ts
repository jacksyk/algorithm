/**
 * @url https://leetcode.cn/problems/implement-stack-using-queues/description/
 */

class MyStack {
    queue: Array<number>
    constructor() {
        this.queue = []
    }

    push(x: number): void {
        this.queue.push(x)
    }

    pop(): number {
        return this.queue.pop() || -1
    }

    top(): number {
        return this.queue.concat([]).pop() || -1
    }

    empty(): boolean {
        return this.queue.length === 0
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
