/**
 * @url https://leetcode.cn/problems/queue-reconstruction-by-height/description/
 */

// notice：题意剖析：给一个随意排序的数组，根据数组中的特性进行重建
// 贪心：people[i][1]越小的人在越前面么？❎
// TODO:本题两个维度，一定是先确认其中一个维度，可以尝试一下（本题先将身高确认下来，再来改变数组，确认k）

// [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
// [ [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 5, 0 ], [ 5, 2 ], [ 4, 4 ] ]
// notice:排序有点问题
// function reconstructQueue(people: number[][]): number[][] {
//     people.sort((a, b) => b[0] - a[0])
//     for (let i = 0; i < people.length; i++) {
//         people.splice(i, 1)
//         people.splice(people[i][1], 0, people[i])
//     }
//     return people
// }

function reconstructQueue(people: number[][]): number[][] {
  people.sort((a, b) => {
    // 身高相等，h大的放后面
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });

  const res = people.concat();

  for (let i = 0; i < people.length; i++) {
    res.splice(i, 1);
    res.splice(people[i][1], 0, people[i]);
  }
  return res;
}

console.log(
  reconstructQueue([
    [7, 0],
    [4, 4],
    [7, 1],
    [5, 0],
    [6, 1],
    [5, 2],
  ])
);
