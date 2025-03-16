/**
 * @url https://leetcode.cn/problems/squares-of-a-sorted-array/description/
 */
function sortedSquares(nums: number[]): number[] {
  const result: number[] = [];
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let leftRow = Math.pow(nums[left], 2),
      rightRow = Math.pow(nums[right], 2);
    if (leftRow <= rightRow) {
      result.unshift(rightRow);
      right--;
    } else {
      result.unshift(leftRow);
      left++;
    }
  }
  return result;
}
console.log(sortedSquares([-4, -1, 0, 3, 10]));
