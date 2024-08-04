/**
 * @url https://leetcode.cn/problems/candy/description/
 */

// notice：先考虑一遍，然后再进行整合
function candy(ratings: number[]): number {
    const res = new Array(ratings.length).fill(1)
    // 确定右孩子比左孩子大的情况
    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) {
            res[i] = res[i - 1] + 1
        }
    }
    console.log("res", res)

    // 确定左孩子比右孩子大，倒序遍历，因为要用到后面先比较的结果
    for (let i = ratings.length - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            res[i] = Math.max(res[i], res[i + 1] + 1)
        }
    }
    console.log(res)

    return res.reduce((acc, cur) => acc + cur, 0)
}
candy([1, 0, 2])
