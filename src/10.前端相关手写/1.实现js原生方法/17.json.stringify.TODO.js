/** https://juejin.cn/post/6844903861971320846?searchId=20240811235902CCC1D8113CE9807307E3 */
/** https://juejin.cn/post/6844903861971320846?searchId=20240811235902CCC1D8113CE9807307E3 */

function jsonStringify(data) {
    // 处理基础类型
    if (data === null) return 'null';
    if (data === undefined) return undefined;
    if (typeof data === 'boolean') return data.toString();
    if (typeof data === 'number') {
        return isFinite(data) ? data.toString() : 'null';
    }
    if (typeof data === 'string') return `"${data}"`;
    if (typeof data === 'symbol') return undefined;
    if (typeof data === 'function') return undefined;

    // 处理数组
    if (Array.isArray(data)) {
        const items = data.map(item => jsonStringify(item) ?? 'null');
        return `[${items.join(',')}]`;
    }

    // 处理对象
    if (typeof data === 'object') {
        // 处理日期对象
        if (data instanceof Date) {
            return `"${data.toISOString()}"`;
        }

        // 处理正则对象
        if (data instanceof RegExp) {
            return '{}';
        }

        const items = Object.entries(data)
            .filter(([_, value]) => value !== undefined && typeof value !== 'function')
            .map(([key, value]) => `"${key}":${jsonStringify(value)}`);

        return `{${items.join(',')}}`;
    }
}

// 测试用例
const testCases = [
    // 基础类型
    null,
    undefined,
    true,
    123,
    "hello",
    Symbol(),
    () => { },
    NaN,
    Infinity,

    // 数组
    [1, "2", true, null, undefined],

    // 对象
    {
        name: "张三",
        age: 25,
        married: false,
        children: null,
        symbol: Symbol(),
        func: function () { },
        date: new Date(),
        reg: /test/,
        undef: undefined
    }
];

// 测试并比较结果
testCases.forEach((test, index) => {
    console.log(`测试用例 ${index + 1}:`);
    console.log('自定义实现:', jsonStringify(test));
    console.log('原生实现:', JSON.stringify(test));
    console.log('---');
});