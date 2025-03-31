function jsonParse(str) {
    // 去除空白字符
    str = str.trim();

    // 记录当前解析位置
    let i = 0;

    // 解析主函数
    function parseValue() {
        const char = str[i];

        if (char === '{') return parseObject();
        if (char === '[') return parseArray();
        if (char === '"') return parseString();
        if (char === 't') return parseTrue();
        if (char === 'f') return parseFalse();
        if (char === 'n') return parseNull();
        return parseNumber();
    }

    // 解析对象
    function parseObject() {
        i++; // 跳过 '{'
        const result = {};

        while (i < str.length) {
            if (str[i] === '}') {
                i++;
                return result;
            }

            if (str[i] === ',') {
                i++;
                continue;
            }

            // 解析键
            const key = parseString();
            i++; // 跳过 ':'
            // 解析值
            const value = parseValue();
            result[key] = value;
        }
        return result;
    }

    // 解析数组
    function parseArray() {
        i++; // 跳过 '['
        const result = [];

        while (i < str.length) {
            if (str[i] === ']') {
                i++;
                return result;
            }

            if (str[i] === ',') {
                i++;
                continue;
            }

            const value = parseValue();
            result.push(value);
        }
        return result;
    }

    // 解析字符串
    function parseString() {
        i++; // 跳过开始的双引号
        let result = '';

        while (str[i] !== '"') {
            if (str[i] === '\\') {
                i++;
                if (str[i] === 'n') result += '\n';
                else if (str[i] === 'r') result += '\r';
                else if (str[i] === 't') result += '\t';
                else result += str[i];
            } else {
                result += str[i];
            }
            i++;
        }

        i++; // 跳过结束的双引号
        return result;
    }

    // 解析数字
    function parseNumber() {
        let start = i;
        while (i < str.length && /[\d.+-e]/i.test(str[i])) {
            i++;
        }
        return Number(str.slice(start, i));
    }

    // 解析 true
    function parseTrue() {
        i += 4; // 跳过 'true'
        return true;
    }

    // 解析 false
    function parseFalse() {
        i += 5; // 跳过 'false'
        return false;
    }

    // 解析 null
    function parseNull() {
        i += 4; // 跳过 'null'
        return null;
    }

    return parseValue();
}

// 测试用例
const testCases = [
    '{"name":"张三","age":25,"married":false,"children":null}',
    '[1,2,3,"4",true,null]',
    '{"scores":[90,85,88],"pass":true}',
    '"Hello\\nWorld"',
    '123.456',
    'true',
    'false',
    'null'
];

testCases.forEach((test, index) => {
    console.log(`测试用例 ${index + 1}:`);
    console.log('自定义实现:', jsonParse(test));
    console.log('原生实现:', JSON.parse(test));
    console.log('---');
});