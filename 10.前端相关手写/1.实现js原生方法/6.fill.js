Array.prototype._fill = function (value, start, end) {
    start = start < 0 ? 0 : start
    end = end > this.length - 1 ? this.length - 1 : end
    for (let i = start; i <= end; i++) {
        this[i] = value
    }
    return this
}
let arr = [1, 2, 3, 4, 5]
console.log(arr._fill(6, 2, 5))
