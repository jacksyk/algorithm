/**
 * @url https://leetcode.cn/problems/reverse-words-in-a-string/description/
 */

// todo：获取字符串的单词
// todo：死循环？不太可能，因为每一次循环都会走一次判空和非判空的处理。
const getTokens = (s: string) => {
    let trimS = s.trim(),
        left = trimS.length - 1,
        right = trimS.length - 1,
        words: Array<string> = []

    // ps: 双指针模拟提取tokens
    while (left >= 0) {
        while (left >= 0 && trimS[left] !== " ") {
            left--
        }
        words.push(trimS.slice(left + 1, right + 1))
        while (left >= 0 && trimS[left] === " ") {
            left--
        }
        right = left
    }
    return words
}

function joinTokens(words: Array<string>) {
    return words
        .reduce((res, _cur) => {
            return res + " " + _cur
        }, "")
        .trimStart()
}

function reverseWords(s: string): string {
    return joinTokens(getTokens(s))
}
