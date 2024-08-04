// nums = [1,7,4,9,2,5]
// 输出：6
// 解释：整个序列均为摆动序列，各元素之间的差值为 (6, -3, 5, -7, 3) 。

// dp[i]表示以nums[i]为结尾的摆动序列的长度
// nums[i]-nums[i-1]>0  判断nums[i-1]-nums[i-2]<0 反之  dp[i] = dp[i-1]+1  dp[i] = dp[i-1]
// notice:还是状态考虑错了，这样并没有考虑前面是山峰还是山谷   25/31
// function wiggleMaxLength(nums: number[]): number {
//     const dp = new Array(nums.length).fill(0)
//     if (nums.length < 2) {
//         return 1
//     }
//     dp[0] = 1
//     dp[1] = nums[1] === nums[0] ? 1 : 2
//     if ((dp[1] - dp[0] > 0 && dp[2] - dp[1] < 0) || (dp[1] - dp[0] < 0 && dp[2] - dp[1] > 0)) {
//         dp[2] = 3
//     }
//     for (let i = 2; i < nums.length; i++) {
//         if (
//             (nums[i] - nums[i - 1] > 0 && nums[i - 1] - nums[i - 2] < 0) ||
//             (nums[i] - nums[i - 1] < 0 && nums[i - 1] - nums[i - 2] > 0)
//         ) {
//             dp[i] = dp[i - 1] + 1
//         } else {
//             dp[i] = dp[i - 1]
//         }
//     }
//     console.table(dp)
//     return Math.max(...dp)
// }
// wiggleMaxLength([84])

// TODO:动态规划思路2
// dp[i][0] = max(dp[i][0], dp[j][1] + 1)，其中0 < j < i且nums[j] < nums[i]，表示将 nums[i]接到前面某个山谷后面，作为山峰。
// dp[i][1] = max(dp[i][1], dp[j][0] + 1)，其中0 < j < i且nums[j] > nums[i]，表示将 nums[i]接到前面某个山峰后面，作为山谷。
function wiggleMaxLength(nums: number[]): number {
    const dp = new Array(nums.length).fill(0).map((_v) => new Array(2).fill(0))
    dp[0][0] = 1
    dp[0][1] = 1
    for (let i = 1; i < nums.length; i++) {
        // 这里的初始化：两个数相等，算是一个数的情况的摆动序列
        dp[i][0] = 1
        dp[i][1] = 1
        for (let j = 0; j < i; j++) {
            if (nums[i] - nums[j] > 0) {
                // 前面应该是谷底
                dp[i][1] = Math.max(dp[j][0] + 1, dp[i][1])
            } else if (nums[i] - nums[j] < 0) {
                dp[i][0] = Math.max(dp[j][1] + 1, dp[i][0])
            }
        }
    }
    return Math.max(...dp[nums.length - 1])
}
