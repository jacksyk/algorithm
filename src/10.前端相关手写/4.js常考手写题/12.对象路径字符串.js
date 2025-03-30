// 实现一个class，满足下面的输出
class Data {
    constructor(data) {
        this.watcher = new Map() // 字符串，callback回调函数
        this.data = data
    }
    get(str) {
        return str.split('.').reduce((acc, cur) => acc[cur], this.data)
    }
    set(str, val) {
        const keys = str.split('.')
        const lastKey = keys.pop()
        let current = this.data
        keys.forEach(key => {
            current = current[key]
        })
        current[lastKey] = val
        this.watcher.get(str).forEach(cb => cb(val))
    }
    watch(str, callback) {
        if (!this.watcher.has(str)) {
            this.watcher.set(str, new Set())
        }
        this.watcher.set(str, this.watcher.get(str).add(callback))
    }
}

const data = new Data({ a: { b: { c: { d: 4 } } } })

console.log(data.get('a.b')) // { a: { b: { c: { d: 4 } } } }
data.watch('a.b', (data) => console.log(data))
data.set('a.b', 2) // 2