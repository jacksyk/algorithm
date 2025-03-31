// import * as readline from 'readline';
// let rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
// });
// rl.on('line',function(data){
//  console.log(data);
// })
function formatStr(object) {
    let res = {}
    for (let [key, value] of Object.entries(object)) {
        const arr = key.split('.')
        const lastKey = arr.pop()
        let child = res
        for (let i = 0; i < arr.length; i++) {
            // 如果有
            if (child[arr[i]]) {
                child = child[arr[i]]
                continue
            }
            child[arr[i]] = {}
            child = child[arr[i]]
        }
        // 处理结果
        child[lastKey] = value
    }
    return res
}


// ps：更加简洁的写法
function formatStr(flatObj) {
    const result = {};

    Object.entries(flatObj).forEach(([key, value]) => {
        const keys = key.split('.');
        let current = result;

        keys.forEach((k, index) => {
            if (index === keys.length - 1) {
                current[k] = value;
            } else {
                current[k] = current[k] || {};
                current = current[k];
            }
        });
    });

    return result;
}

const foo1 = {
    'A': 1,
    'B.A': 2,
    'B.B': 4,
    'CC.D.E': 3,
    'CC.D.F': 5
}

console.log(JSON.stringify(formatStr(foo1)))
//写一个方法将其格式化化为：
// const foo2 =  {
//     "A": 1,
//     "B": {
//         "A": 2,
//         "B": 4
//     },
//     "CC": {
//         "D": {
//             "E": 3,
//             "F": 5
//         }
//     }
// }