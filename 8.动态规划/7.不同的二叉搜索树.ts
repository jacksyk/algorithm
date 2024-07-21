/**
 * @url https://leetcode.cn/problems/unique-binary-search-trees/description/
 * @resolve https://leetcode.cn/problems/unique-binary-search-trees/solutions/6693/hua-jie-suan-fa-96-bu-tong-de-er-cha-sou-suo-shu-b/
 */
// G[n]代表n个节点的二叉搜索树的个数
// f[i]代表以i为根节点的二叉搜索树的个数

// G[n] = f(1)+f(2)+....f(n)
// f(i) = G(i-1)*G(n-i)
// G(n) = G(0)*G(n-1)+G(1)*G(1)+.....G(n-1)*G(0)

function numTrees(n: number): number {
    const dp = new Array(n + 1).fill(0) // dp[n]表示n个节点的二叉树的个数
    dp[1] = 1
    dp[0] = 1 // 其实没有任何意义
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j]
        }
    }

    return dp[n]
}
