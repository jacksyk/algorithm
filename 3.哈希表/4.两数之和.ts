/**
 * @url https://leetcode.cn/problems/two-sum/description/
 */
function twoSum(nums: number[], target: number): number[] {
    const map = new Map()
    for (let index = 0; index < nums.length; index++) {
        if (map.has(target - nums[index])) {
            return [index, map.get(target - nums[index])]
        }
        map.set(nums[index], index)
    }
    return [-1, -1]
}
