/**
 * @url https://leetcode.cn/problems/reverse-string-ii/
 */

// 字符串的长度为j-i+1 i+k其实就是索引在原先的基础上去加一了。所以这里判断的时候也就是判断index+k>s.length了
function reverseStr(s: string, k: number): string {
    for (let index = 0; index < s.length; index += 2 * k) {
        if (index + k > s.length) {
            s =
                s.slice(0, index) +
                s
                    .slice(index + k)
                    .split("")
                    .reverse()
                    .join("")
        } else {
            s =
                s.slice(0, index) +
                s
                    .slice(index, index + k)
                    .split("")
                    .reverse()
                    .join("") +
                s.slice(index + k)
        }
    }
    return s
}

// notice:主要坑点注意下标位置  index 后面的 index + k
// notice:index 后面的 index + k
