/**
 * @url https://leetcode.cn/problems/gas-station/description/
 */

// -2 -2  -2 3 3
// notice：考虑错了,并不是从剩余中最大的出去就是好的
// function canCompleteCircuit(gas: number[], cost: number[]): number {
//     const arr: number[] = [] // 表示arr[i]前往i+1站剩余的邮费
//     for (let i = 0; i < gas.length; i++) {
//         arr.push(gas[i] - cost[i])
//     }
//     console.log(arr)
//     let maxIndex = arr.indexOf(Math.max(...arr))
//     let curIndex = maxIndex
//     let count = 0,
//         curNum = 0
//     while (count < gas.length) {
//         count++
//         curNum += arr[curIndex % gas.length]
//         console.log(count, gas.length, "cur")

//         if (curNum <= 0 && count !== gas.length) {
//             return -1
//         }
//         curIndex++
//     }

//     return maxIndex
// }
// console.log(canCompleteCircuit([5, 8, 2, 8], [6, 5, 6, 6]))

// TODO:暴力解法,超时了。技巧：环形链表用while来遍历比较好
// function canCompleteCircuit(gas: number[], cost: number[]): number {
//     const arr: number[] = [] // 表示arr[i]前往i+1站剩余的邮费
//     let result = -1
//     for (let i = 0; i < gas.length; i++) {
//         arr.push(gas[i] - cost[i])
//     }
//     for (let i = 0; i < gas.length; i++) {
//         let curIndex = i,
//             count = gas.length,
//             res = 0,
//             isPass = true
//         while (count--) {
//             res += arr[curIndex++ % gas.length]
//             if (res < 0) {
//                 isPass = false
//                 break
//             }
//         }
//         if (isPass) {
//             result = curIndex % gas.length
//             break
//         }
//     }
//     return result
// }

// *贪心:总数只要大于0一定就可以走完，看看从什么时候开始小于0，然后更新起始的下标索引。
function canCompleteCircuit(gas: number[], cost: number[]): number {
  const arr: number[] = []; // 表示arr[i]前往i+1站剩余的邮费
  for (let i = 0; i < gas.length; i++) {
    arr.push(gas[i] - cost[i]);
  }
  let startIndex = 0,
    totalSum = 0,
    curSum = 0;
  for (let i = 0; i < gas.length; i++) {
    curSum += arr[i];
    totalSum += arr[i];
    if (curSum < 0) {
      startIndex = i + 1;
      curSum = 0;
    }
  }
  if (totalSum < 0) return -1;
  return startIndex;
}
