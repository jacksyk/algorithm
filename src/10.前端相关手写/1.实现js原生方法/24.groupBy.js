/**
 * @url https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy
 */
Object.prototype.myGroupBy = function (fn) {
    const res = {}
    for (const item of this) {
        const key = fn(item)
        if (res[key]) {
            res[key].push(item)
        } else {
            res[key] = [item]
        }
    }
    return res
}

const inventory = [
    { name: "芦笋", type: "蔬菜", quantity: 5 },
    { name: "香蕉", type: "水果", quantity: 0 },
    { name: "山羊", type: "肉", quantity: 23 },
    { name: "樱桃", type: "水果", quantity: 5 },
    { name: "鱼", type: "肉", quantity: 22 },
];

const result = inventory.myGroupBy((item) => item.type);
console.log(result);