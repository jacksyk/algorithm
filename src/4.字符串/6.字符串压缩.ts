/**
 * @url https://leetcode.cn/problems/string-compression/description/
 */
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars: string[]) {
    const res: Array<string> = []
    for (let i = 0; i < chars.length; i++) {
        let start = i
        let count = 1
        while (chars[start] === chars[start + 1]) {
            start++
            count++
        }
        res.push(chars[i])
        if (count !== 1) {
            for (let item of count.toString().split('')) {
                res.push(item)
            }
        }
        i = start
    }
    chars.splice(0, res.length)
    chars.unshift(...res)
    return res.length
};