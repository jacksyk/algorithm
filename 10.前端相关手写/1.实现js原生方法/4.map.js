Array.prototype._map = function (callback) {
    return this.reduce((acc, cur, index) => {
        acc.push(callback(cur, index, this))
        return acc
    }, [])
}
const res = [2, 3, 4]
console.log(res._map((_v) => _v ** 2))
