/**
 * @url https://leetcode.cn/problems/happy-number/description/
 */

// notice:取模技巧  从个位开始取
const getNext = (n) => {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
};

const getSqrtNum = (num: string) => {
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    sum += Math.pow(Number(num[i]), 2);
  }
  return sum;
};
function isHappy(n: number): boolean {
  const set = new Set();
  while (true) {
    if (n === 1) {
      return true;
    }
    if (set.has(n)) return false;
    set.add(n);
    n = getSqrtNum(n.toString());
  }
}
