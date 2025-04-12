/**
 * @url https://leetcode.cn/problems/4sum-ii/description/
 */
// function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
//     let res1: number[] = [],
//         res2: number[] = [],
//         count = 0
//     for (let i = 0; i < nums1.length; i++) {
//         for (let j = 0; j < nums2.length; j++) {
//             res1.push(nums1[i] + nums2[j])
//         }
//     }
//     for (let i = 0; i < nums3.length; i++) {
//         for (let j = 0; j < nums4.length; j++) {
//             res2.push(nums3[i] + nums4[j])
//         }
//     }

//     for (let i = 0; i < res1.length; i++) {
//         for (let j = 0; j < res2.length; j++) {
//             if (res1[i] + res2[j] === 0) {
//                 count++
//             }
//         }
//     }
//     return count
// }

// notice:用数组来比较，最后会展示超时，优化的点就是利用Map减少最后遍历的次数
function fourSumCount(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  let map1 = new Map(),
    map2 = new Map(),
    count = 0;

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      let sum = nums1[i] + nums2[j];
      if (map1.has(sum)) {
        map1.set(sum, map1.get(sum) + 1);
      } else {
        map1.set(sum, 1);
      }
    }
  }

  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      let sum = nums3[i] + nums4[j];
      if (map2.has(sum)) {
        map2.set(sum, map2.get(sum) + 1);
      } else {
        map2.set(sum, 1);
      }
    }
  }

  for (let [key1, value1] of map1.entries()) {
    for (let [key2, value2] of map2.entries()) {
      if (key1 + key2 === 0) {
        count += value1 * value2;
      }
    }
  }

  return count;
}
