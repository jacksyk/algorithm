Array.prototype._unshift = function (value) {
    for (let i = this.length - 1; i >= 0; i--) {
        this[i + 1] = this[i]
    }
    this[0] = value
    return this.length
}
let arr = [1, 2, 3, 4, 5]
arr._unshift(0)
console.log(arr)
