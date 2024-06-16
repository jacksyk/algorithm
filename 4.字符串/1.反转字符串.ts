/**
 * @url https://leetcode.cn/problems/reverse-string/
 */

function reverseString(s: string[]): void {
    let left = 0,
        right = s.length - 1
    while (right > left) {
        ;[s[right], s[left]] = [s[left], s[right]]
        right--
        left++
    }
}
