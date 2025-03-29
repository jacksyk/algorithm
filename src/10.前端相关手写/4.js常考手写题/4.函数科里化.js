// 实现一个add方法, 使计算结果能够满足以下预期
// add(1)(2)(3)() = 6
// add(1,2,3)(4)() = 10
// add(1)(2)(3)(4)(5)() = 15

function add(...arg1) {
    let totalSum = arg1.reduce((acc, cur) => acc + cur, 0)
    return function result(...arg2) {
        if (arg2.length === 0) {
            return totalSum
        } else {
            totalSum += arg2.reduce((acc, cur) => acc + cur, 0)
            return result
        }
    }
}
console.log(add(1)(2)(3)())
console.log(add(1, 2, 3)(4)())
console.log(add(1)(2)(3)(4)(5)())
