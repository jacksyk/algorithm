function add(nums) {
    return nums.reduce((acc, cur) => acc + cur, 0)
}
const num = add([1, 2, 3])
console.log(num)
