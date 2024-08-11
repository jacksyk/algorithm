Array.prototype.getLeval = function () {
    let maxDepth = Number.MIN_SAFE_INTEGER
    const dfs = (arr, depth) => {
        maxDepth = Math.max(maxDepth, depth)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Array) {
                depth++
                dfs(arr[i], depth)
                depth--
            }
        }
    }
    dfs(this, 1)
    return maxDepth
}

let arr = [1, 2, 3, [4, [5]]]
console.log(arr.getLeval())
