/**
 * @url https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=top-100-liked
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let l = 0, r = height.length - 1, res = 0
    while (l < r) {
        const h = Math.min(height[l], height[r])
        const area = h * (r - l)
        res = Math.max(res, area)
        if (height[l] < height[r]) {
            l++
        } else {
            r--
        }
    }
    return res
};