/**
 * @url https://leetcode.cn/problems/house-robber-ii/description/
 */

// 偷了1就不能够偷最后一个，偷了最后一个就不能偷第一个
// TODO:dp[i]表示到达第[i+1]房屋所能偷到的最大额度
function rob(nums: number[]): number {
    const dp1 = new Array(nums.length - 1).fill(0)
    const dp2 = new Array(nums.length - 1).fill(0)
    if (nums.length === 1) return nums[0]
    dp1[0] = nums[0]
    dp1[1] = Math.max(nums[0], nums[1])
    dp2[0] = nums[1]
    dp2[1] = Math.max(nums[1], nums[2])

    const nums1 = nums.concat([])
    const nums2 = nums.concat([])
    nums1.pop()
    nums2.shift()
    for (let i = 2; i < nums1.length; i++) {
        dp1[i] = Math.max(dp1[i - 2] + nums1[i], dp1[i - 1])
    }
    for (let i = 2; i < nums2.length; i++) {
        dp2[i] = Math.max(dp2[i - 2] + nums2[i], dp2[i - 1])
    }

    console.log(dp1, dp2)

    return Math.max(dp1[nums.length - 2], dp2[nums.length - 2])
}
console.log(rob([1, 3, 2]))
