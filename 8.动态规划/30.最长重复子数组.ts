/**
 * @url https://leetcode.cn/problems/maximum-length-of-repeated-subarray/description/
 */

// TODO:dp[i][j]表示以num1[i]为末尾项，末尾项为nums2[j]的子数组
// nums[i] nums[j]
// 优化点：init初始化可以简洁一点，不用手动去初始化
function findLength(nums1: number[], nums2: number[]): number {
    const dp = new Array(nums1.length).fill(0).map((_v) => new Array(nums2.length).fill(0))
    let res = Number.MIN_SAFE_INTEGER
    for (let i = 0; i < nums1.length; i++) {
        if (nums1[i] === nums2[0]) {
            dp[i][0] = 1
            res = 1
        }
    }
    for (let i = 0; i < nums2.length; i++) {
        if (nums2[i] === nums1[0]) {
            dp[0][i] = 1
            res = 1
        }
    }

    for (let i = 1; i < nums1.length; i++) {
        for (let j = 1; j < nums2.length; j++) {
            if (nums1[i] === nums2[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            }
            res = Math.max(res, dp[i][j])
        }
    }
    console.table(dp)
    return res === Number.MIN_SAFE_INTEGER ? 0 : res
}
findLength([1, 2, 3, 2, 1], [3, 2, 1, 2, 7])

// 12321
// 32127
