Object.prototype._assign = function (target, ...source) {
    source.forEach((_obj) => {
        for (let key in _obj) {
            if (target.hasownProperty(key)) {
                target[key] = _obj[key]
            } else {
                target[key] = _obj[key]
            }
        }
    })
    return target
}
let a = { a: 1 }
let b = { b: 2 }
let c = { c: 3 }
console.log(Object.assign(a, b, c))
console.log(a)
