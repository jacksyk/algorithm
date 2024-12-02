## 刷题备战

算法小册 😀😀😀

ACM 模式 node 输入输出

```javascript
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.on("line", (line) => {
    const inputArray = line.split(" ").map((_num) => Number(_num));
});
```
