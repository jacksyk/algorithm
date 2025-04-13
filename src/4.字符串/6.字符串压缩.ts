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

// 常量空间复杂度
// a a b b c c c
var compressV2 = function (chars: string[]): number {
    let write = 0  // 写指针
    let read = 0   // 读指针
    
    while (read < chars.length) {
        let count = 1
        let currentChar = chars[read]
        
        // 统计连续相同字符的数量
        while (read + 1 < chars.length && chars[read] === chars[read + 1]) {
            read++
            count++
        }
        
        // 写入字符
        chars[write++] = currentChar
        
        // 如果count大于1，则写入数字
        if (count > 1) {
            const countStr = count.toString()
            for (let digit of countStr) {
                chars[write++] = digit
            }
        }
        
        read++
    }
    
    return write
}