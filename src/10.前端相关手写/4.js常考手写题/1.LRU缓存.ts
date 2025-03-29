// 最近最少使用
/**
 * @url https://leetcode.cn/problems/lru-cache/description/?envType=study-plan-v2&envId=top-100-liked
 */

// map迭代的顺序是插入的顺序
class LRUCache {
    capacity: number
    map: Map<number, number>
    constructor(capacity: number) {
        this.capacity = capacity
        this.map = new Map()
    }

    // 每次获取值的时候，重新赋值给map。
    get(key: number): number {
        if (this.map.has(key)) {
            const value = this.map.get(key)
            this.map.delete(key)
            this.map.set(key, value!)
            return value!
        }
        return -1
    }

    put(key: number, value: number): void {
        if (this.map.size === this.capacity) {
            // 删除最近最少使用的了
            const deleteKey = this.map.keys().next().value
            this.map.delete(Number(deleteKey))
        }
        if (this.map.has(key)) {
            this.map.delete(key)
        }
        this.map.set(key, value)
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

let lRUCache = new LRUCache(2)
lRUCache.put(1, 1) // 缓存是 {1=1}
lRUCache.put(2, 2) // 缓存是 {1=1, 2=2}
lRUCache.get(1) // 返回 1
lRUCache.put(3, 3) // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2) // 返回 -1 (未找到)
lRUCache.put(4, 4) // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1) // 返回 -1 (未找到)
lRUCache.get(3) // 返回 3
lRUCache.get(4) // 返回 4
