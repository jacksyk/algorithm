/**
 * @url https://leetcode.cn/problems/ones-and-zeroes/description/
 */

// dp表示不超过容量的情况下，有多少个子集
function findMaxForm(strs: string[], m: number, n: number): number {
    const dp = new Array(m + 1).fill(0).map((_v) => new Array(n + 1).fill(0))

    dp[0][0] = 0

    const getMandN = (str: string) => {
        let m = 0,
            n = 0
        for (let i = 0; i < str.length; i++) {
            if (str[i] === "1") {
                n++
            } else {
                m++
            }
        }
        return {
            m,
            n,
        }
    }

    for (let i = 0; i < strs.length; i++) {
        const { m: strm, n: strn } = getMandN(strs[i])
        for (let j = m; j >= strm; j--) {
            for (let k = n; k >= strn; k--) {
                dp[j][k] = Math.max(dp[j - strm][k - strn] + 1, dp[j][k])
            }
        }
    }

    return dp[m][n]
}

findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)
