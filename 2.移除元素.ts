function removeElement(nums: number[], val: number): number {
    let slow = 0,
        fast = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === val) {
            fast++
        } else {
            nums[slow++] = nums[fast++]
        }
    }
    return slow
}
