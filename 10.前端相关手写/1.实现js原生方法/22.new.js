// （1）首先创建了一个新的空对象
// （2）设置原型，将对象的原型设置为函数的 prototype 对象。
// （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype)
    const res = fn.call(obj, ...args)
    return typeof res === "object" ? res : obj
}
function Person(name) {
    this.name = name
}
Person.prototype.say = function () {
    console.log("hello")
}
const obj = myNew(Person, "ljq")
obj.say()
console.log(obj)
