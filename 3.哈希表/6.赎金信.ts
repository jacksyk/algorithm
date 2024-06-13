/**
 * @url https://leetcode.cn/problems/ransom-note/description/
 */
function canConstruct(ransomNote: string, magazine: string): boolean {
    let arr = new Array(26).fill(0)
    for (let index = 0; index < magazine.length; index++) {
        arr[magazine[index].charCodeAt(0) - "a".charCodeAt(0)]++
    }
    for (let index = 0; index < ransomNote.length; index++) {
        arr[ransomNote[index].charCodeAt(0) - "a".charCodeAt(0)]--
    }
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] < 0) {
            return false
        }
    }
    return true
}
