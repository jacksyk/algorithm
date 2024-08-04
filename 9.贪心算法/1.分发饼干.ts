/**
 * @url https://leetcode.cn/problems/assign-cookies/description/
 */

// notice:孩子不变，饼干是分发的
// function findContentChildren(g: number[], s: number[]): number {
//     const sort = (arr: number[]) => arr.sort((a, b) => a - b)

//     let bottom = 0
//     sort(g)
//     sort(s)
//     for (let i = 0; i < Math.min(s.length, g.length); i++) {
//         if (s[bottom] >= g[i]) {
//             bottom++
//         }
//     }
//     return bottom
// }
function findContentChildren(g: number[], s: number[]): number {
    const sort = (arr: number[]) => arr.sort((a, b) => a - b)
    let child = 0
    sort(g)
    sort(s)
    for (let i = 0; i < s.length; i++) {
        if (s[i] >= g[child]) {
            child++
        }
    }

    return child
}
