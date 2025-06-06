/**
 * @url https://leetcode.cn/problems/word-break/description/
 */

// 排列还是组合，遍历顺序的考量 dp[j]表示长度为j的字符串是否能够被拼接
// !notice：这一维度的赋值
function wordBreak(s: string, wordDict: string[]): boolean {
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let j = 1; j <= s.length; j++) {
    // 这个for循环每次都会对dp进行覆盖操作
    for (let i = 0; i < wordDict.length; i++) {
      const word = wordDict[i];
      if (j >= word.length) {
        const word1 = s.slice(j - word.length, j);
        if (word === word1 && dp[j - word.length]) {
          dp[j] = true;
          break; // 如果不加break，后面遍历上来，可能会把他给覆盖。
        } else {
          dp[j] = false;
        }
      } else {
        dp[j] = false;
      }
    }
  }

  return dp[s.length];
}

wordBreak("applepenapple", ["apple", "pen"]);

// !notice：暴力回溯递归解法
function wordBreak1(s, wordDict) {}

// const wordBreak = (s, wordDict) => {
//   let dp = Array(s.length + 1).fill(false);
//   dp[0] = true;

//   for (let i = 0; i <= s.length; i++) {
//     for (let j = 0; j < wordDict.length; j++) {
//       if (i >= wordDict[j].length) {
//         if (
//           s.slice(i - wordDict[j].length, i) === wordDict[j] &&
//           dp[i - wordDict[j].length]
//         ) {
//           dp[i] = true;
//         }
//       }
//     }
//   }

//   return dp[s.length];
// };
