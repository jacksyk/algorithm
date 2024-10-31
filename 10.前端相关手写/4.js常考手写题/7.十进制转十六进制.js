/** // notice:余数法，以十六进制为例,每一次取余数之后，然后进行取反操作 */
const binaryConversion = (nums) => {
    let remainder = [] // 余数
    while (nums !== 0) {
        const temp = nums % 16
        remainder.push(temp)
        nums = Math.floor(nums / 16)
    }
    return Number.parseInt(remainder.reverse().join(""))
}

console.log("binaryConversion(120)", binaryConversion(120))
