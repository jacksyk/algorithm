Array.prototype._push = function (value) {
    this[this.length] = value
    return this.length // 注意返回值
}
let arr = [1, 2, 3, 4, 5]
arr._push(6)
console.log(arr)
