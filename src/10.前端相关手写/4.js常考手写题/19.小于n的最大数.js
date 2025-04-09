/**
 * @url https://edu.51cto.com/video/27365.html
 */

/**
 * @url https://blog.csdn.net/K346K346/article/details/126958310
 */

// ps: 回溯 ---> 暴力解法
const findMax = (arr, num) => {
    const res = []
    const len = num.toString().length
    const dfs = (path) => {
        res.push(path)

        if (path.length === len) {
            return
        }

        for (let i = 0; i < arr.length; i++) {
            dfs(path.concat(arr[i]))
        }
    }
    dfs([])
    const res1 = res.map(item => item.join('')).filter(item => item <= num).sort((a, b) => b - a)
    return res1[0]
}
// console.log(findMax([9], 1000)) // 999
// console.log(findMax([2, 3, 4, 9], 23149)) // 22999
// console.log(findMax([2, 3, 4, 9], 23412)) // 23399

// ps: 贪心
// ===========================================================
// ps: 从高位开始遍历，对每一位先尝试使用相同数字，除了最后一位。
// ps: 如果没有相同的数字时，尝试是否有比当前数字更小的，有的话选更小的数字里最大的，剩下的用最大数字。
// ps: 都没有就向前回溯看前一个有没有更小的。如果一直回溯到第一个数字都没有更小的数字，就用位数更少的全都是最大数字的数。

function findMaxNumber(num, arr) {
    // 将数组从大到小排序
    arr.sort((a, b) => b - a);
    const maxDigit = arr[0];  // 最大数字
    const digits = num.toString().length;  // 获取目标数的位数

    // 获取 num 的每一位
    const numArr = num.toString().split('').map(Number);

    // 辅助函数：将数组转换为数字
    const arrayToNumber = (arr) => parseInt(arr.join(''));

    // 结果数组
    let result = new Array(digits).fill(0);

    // 从高位到低位处理
    for (let i = 0; i < digits; i++) {
        // 除了最后一位，先尝试使用当前位的数字
        let currentDigit = (i === digits - 1) ? maxDigit : numArr[i];

        // ps: 如果当前数字不在 arr 中，或者使用会导致超过 num
        // ps: 最外层维度是判断 第一个数字
        if (!arr.includes(currentDigit) || arrayToNumber([...result.slice(0, i), currentDigit, ...new Array(digits - i - 1).fill(0)]) >= num) {
            // ps: 寻找比当前数字小的最大可用数字
            let found = false;
            for (let j = arr.length - 1; j >= 0; j--) {
                if (arr[j] < numArr[i]) {
                    result[i] = arr[j];
                    // 剩余位数填最大值
                    for (let k = i + 1; k < digits; k++) {
                        result[k] = maxDigit;
                    }
                    found = true;
                    break;
                }
            }

            // ps: 如果没找到更小的数字，需要回溯
            if (!found) {
                let pos = i - 1;
                while (pos >= 0) {
                    // 找到前一位可以变小的位置
                    let prevDigit = result[pos];
                    let smallerDigit = -1;
                    for (let digit of arr) {
                        if (digit < prevDigit && digit <= numArr[pos]) {
                            smallerDigit = digit;
                        }
                    }

                    // 如果找到了
                    if (smallerDigit !== -1) {
                        result[pos] = smallerDigit;
                        // 从 pos + 1 ----> 到最后都填最大值
                        for (let k = pos + 1; k < digits; k++) {
                            result[k] = maxDigit;
                        }
                        return arrayToNumber(result);
                    }
                    pos--;
                }

                // ps: 如果一直回溯到开头都没找到，就减少一位，用全最大值
                if (pos < 0) {
                    return parseInt(maxDigit.toString().repeat(digits - 1));
                }
            }
        } else {
            // ps: 如果当前数字可用，直接使用
            result[i] = currentDigit;
        }
    }

    return arrayToNumber(result);
}

console.log(findMax([9], 1000)) // 999
console.log(findMax([2, 3, 4, 9], 23149)) // 22999
console.log(findMax([2, 3, 4, 9], 23412)) // 23399