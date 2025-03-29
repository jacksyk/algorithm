// 原型链继承
function Parent() {
    this.color = ["red", "blue"]
}
function Child() {}
Child.prototype = new Parent()
const child1 = new Child()
child1.color.push("cc")
console.log("child1.color", child1.color)
const child2 = new Child()
console.log("child2.color", child2.color)

// 缺点：如果继承的对象是一个引用类型，则所有的属性都会被影响
// ===================================================
// 构造函数继承
function Parent1() {
    this.color = ["red", "blue"]
}
function Child1() {
    Parent1.call(this)
}

// 缺点：不能够继承原型上的属性
// ====================================================

// 组合继承
function Parent2() {
    this.color = ["red", "blue"]
}
function Child2() {
    Parent1.call(this)
}
Child2.prototype = new Parent2()

// 缺点：同1

// 寄生组合式继承
function Parent3() {
    this.color = ["red", "blue"]
}
function Child3() {
    Parent1.call(this)
}
Child3.prototype = Object.create(Parent3.prototype)
