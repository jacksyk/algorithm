// 针对于引用数据类型，基本数据类型判断不了

/** 判断左侧是否属于构造函数
 * left 实例
 * right 构造函数
 */
function myInstanceOf(left, rigth) {
    let __proto = left.__proto__,
        prototype = rigth.prototype
    while (__proto) {
        if (prototype === __proto) {
            return true
        }
        __proto = __proto.__proto__
    }
    return false
}

console.log(myInstanceOf([], Array))
