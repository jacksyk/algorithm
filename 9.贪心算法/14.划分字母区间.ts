/**
 * @url https://leetcode.cn/problems/partition-labels/description/
 */

// "ababcbacadefegdehijhklij"
// 例如找到a，需要找到a的某尾，以此类推，一直往后遍历，直到遍历到end+1
// 贪心策略：找到一段字符串的最末尾，然后截断。每次都是最小的一段，最后结果就是截断成各个最小的一段。
function partitionLabels(s: string): number[] {
    let rightIndex = 0,
        lastIndex = 0,
        res: number[] = []
    const findStrLastIndex = (str: string) => {
        return s.lastIndexOf(str)
    }
    for (let i = 0; i < s.length; i++) {
        if (i > rightIndex) {
            res.push(rightIndex - lastIndex + 1)
            lastIndex = rightIndex + 1 // lastIndex===rightIndex的话，会重复计算一次！！！
        }
        rightIndex = Math.max(findStrLastIndex(s[i]), rightIndex)
    }
    // console.log(rightIndex, lastIndex)
    res.push(rightIndex - lastIndex + 1)
    return res
}
// console.log(partitionLabels("aaaaabbbb"))
