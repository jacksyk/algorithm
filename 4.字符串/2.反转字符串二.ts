/**
 * @url https://leetcode.cn/problems/reverse-string-ii/
 */
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
