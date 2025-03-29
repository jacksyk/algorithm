Object.prototype._is = function (x, y) {
    // 判断是否是同一对象（包括 +0/-0） +0和-0是不等的
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y
    } else {
        // 判断是否是 NaN,如果是NAN,is就是相等的
        return x !== x && y !== y
    }
}
