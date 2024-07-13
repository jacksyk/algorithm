/**
 * @url https://leetcode.cn/problems/restore-ip-addresses/description/
 */

// 是否是有效字符串
const isValidStr = (str: string) => {
    if (str.length > 1) {
        if (str.startsWith("0")) {
            return false
        }
        if (Number(str) >= 0 && Number(str) <= 255) {
            return true
        }
        return false
    }
    return true
}
function restoreIpAddresses(s: string): string[] {
    const result: string[] = []
    const dfs = (path: string[], startIdx: number) => {
        if (path.length === 4 && path.length === s.length) {
            result.push(path.join("."))
            return
        }
        for (let i = startIdx; i < s.length; i++) {
            const str = s.slice(startIdx, i + 1)
            if (isValidStr(str)) {
                path.push(str)
                dfs(path.concat([]), i + 1)
                path.pop()
            } else {
                continue
            }
        }
    }
    dfs([], 0)
    return result
}
