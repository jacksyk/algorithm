// 实现catch函数
Promise.prototype._catch = function (callback) {
    this.then(undefined, (err) => callback(err))
}
