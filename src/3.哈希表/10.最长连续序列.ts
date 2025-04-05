/**
 * @url https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    const set: Set<number> = new Set(nums)
    let res = 0
    for (let num of set.values()) {
        // ps：这里进行了剪枝操作
        if (!set.has(num - 1)) {
            let count = 0
            while (set.has(num)) {
                count++
                num++
            }
            res = Math.max(res, count)
        }

    }
    return res
};