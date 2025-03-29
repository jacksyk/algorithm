/**
 * @url https://leetcode.cn/problems/combination-sum/description/
 */

// notice：没有去重操作，用Set来进行去重
// function combinationSum(candidates: number[], target: number): number[][] {
//     const result: number[][] = []
//     const set = new Set()
//     const dfs = (path: number[]) => {
//         const sum = path.reduce((acc, cur) => acc + cur, 0)
//         if (sum > target) {
//             return
//         }
//         if (sum === target) {
//             set.add(JSON.stringify(path.sort((a, b) => a - b)))
//             return
//         }
//         for (let idx = 0; idx < candidates.length; idx++) {
//             path.push(candidates[idx])
//             dfs(path.concat())
//             path.pop()
//         }
//     }
//     dfs([])

//     for (let item of set) {
//         result.push(JSON.parse(item as string))
//     }
//     return result
// }
// 去重操作，在traverse的时候进行去重 // ps:利用startIdx来去进行去重
function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  const dfs = (idx: number, path: number[]) => {
    const sum = path.reduce((acc, cur) => acc + cur, 0);
    if (sum > target) {
      return;
    }
    if (sum === target) {
      res.push(path);
      return;
    }
    for (let i = idx; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, path.concat([]));
      path.pop();
    }
  };
  dfs(0, []);
  return res;
}
