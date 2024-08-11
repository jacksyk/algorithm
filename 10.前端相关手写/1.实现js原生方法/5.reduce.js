Array.prototype._reduce = function (callback, initValue) {
    let res = initValue
    for (let i = 0; i < this.length; i++) {
        res = callback(res, this[i], i)
    }
    return res
}
let arr = [1, 2, 3, 4, 5]
console.log(
    arr._reduce((acc, cur) => {
        return acc + cur
    }, 0)
)
