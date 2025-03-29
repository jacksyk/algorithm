/**
 * @url https://leetcode.cn/problems/combination-sum-ii/description/
 */
// PS:难点去重
function combinationSum2(candidates: number[], target: number): number[][] {
  const result: Array<Array<number>> = [];
  const used: Array<boolean> = new Array(candidates.length).fill(false);
  candidates.sort((a, b) => a - b); // ps:这里排序的意义是防止后面有与前面相同的元素
  const dfs = (startIdx, path) => {
    const sum = path.reduce((acc, cur) => acc + cur, 0);
    if (sum === target) {
      result.push(path);
      return;
    }
    if (sum > target) {
      return;
    }
    for (let i = startIdx; i < candidates.length; i++) {
      if (i > 0 && candidates[i] === candidates[i - 1] && !used[i - 1]) {
        continue;
      }
      used[i] = true;
      path.push(candidates[i]);
      dfs(i + 1, path.concat([]));
      path.pop();
      used[i] = false;
    }
  };
  dfs(0, []);
  return result;
}
