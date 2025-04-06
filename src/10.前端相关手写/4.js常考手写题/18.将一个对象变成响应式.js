const obj = {
    a: {
        b: {
            c: 1
        }
    }
}
// 访问a.b.c 希望打印 a.b，c
function proxy(obj) {
    return new Proxy(obj, {
        get(target, key) {
            console.log(key)
            if (typeof target[key] === 'object') {
                return proxy(target[key])
            }
            return Reflect.get(target, key)
        }
    })
}
const proxyObj = proxy(obj)
console.log(proxyObj.a.b.c)
