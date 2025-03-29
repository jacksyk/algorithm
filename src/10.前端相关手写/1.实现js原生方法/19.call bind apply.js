// 在调用 func 时要使用的 this 值。如果函数不在严格模式下，
// null 和 undefined 将被替换为全局对象，并且原始值将被转换为对象。
Function.prototype._call = function (context, ...args) {
    context = !context ? window : context
    context._fn = this
    const result = context._fn(...args)
    delete context._fn
    return result
}
Function.prototype._bind = function (context, ...args1) {
    context = !context ? window : context
    context._fn = this
    return function (...args2) {
        const result = context._fn(...[...args1, ...args2])
        delete context._fn
        return result
    }
}
Function.prototype._apply = function (context, args) {
    context = !context ? window : context
    context._fn = this
    const result = context._fn(...args)
    delete context._fn
    return result
}
