/**
 * @url https://leetcode.cn/problems/remove-element/description/
 */
function removeElement(nums: number[], val: number): number {
    let slow = 0,
        fast = 0
    while (fast < nums.length) {
        nums[slow] = nums[fast]
        if (nums[fast] === val) {
            fast++
        } else {
            slow++
            fast++
        }
    }
    return slow
}
console.log(removeElement([3, 2, 2, 3], 3))
