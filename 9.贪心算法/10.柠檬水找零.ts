/**
 * @url https://leetcode.cn/problems/lemonade-change/description/
 */

// [5,5,5,10,20]
// 返回的时候，优先返回面额大的

// 账单只会支付20元,账单为20元的判断错误了
// function lemonadeChange(bills: number[]): boolean {
//     const map = new Array(3).fill(0) // 分别表示5元钞票，10元钞票，15元钞票的张数
//     for (let i = 0; i < bills.length; i++) {
//         if (bills[i] === 20) {
//             if (map[1] <= 0 || map[0] <= 0) {
//                 return false
//             }
//             map[1]--
//             map[0]--
//             map[2]++
//         } else if (bills[i] === 10) {
//             if (map[0] <= 0) {
//                 return false
//             }
//             map[1]++
//             map[0]--
//         } else {
//             map[0]++
//         }
//     }
//     return true
// }

// 贪心的策略就是当20的时候，优先去找10元的
function lemonadeChange(bills: number[]): boolean {
    const map = new Array(3).fill(0) // 分别表示5元钞票，10元钞票，15元钞票的张数
    for (let i = 0; i < bills.length; i++) {
        if (bills[i] === 20) {
            if (map[1] <= 0) {
                if (map[0] < 3) {
                    return false
                }
                map[0] -= 3
            } else {
                if (map[0] <= 0) {
                    return false
                }
                map[0]--
                map[1]--
                map[2]++
            }
        } else if (bills[i] === 10) {
            if (map[0] <= 0) {
                return false
            }
            map[1]++
            map[0]--
        } else {
            map[0]++
        }
    }
    return true
}
