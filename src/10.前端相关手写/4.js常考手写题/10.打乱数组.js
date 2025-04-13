const arr = [1, 2, 3, 4, 5, 6]
function sortRandom(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
        const randomIndex = Math.floor(Math.random() * (j + 1))
        const temp = arr[j]
        arr[j] = arr[randomIndex]
        arr[randomIndex] = temp
    }
    return arr
}

// ps: 验证随机性
function test() {
    const count = 10000
    // const tmp = new Array(arr.length).fill(0)
    const map = new Map()
    for (let i = 0; i < count; i++) {
        const sorted = sortRandom(arr)
        // tmp[sorted[0]]++
        map.set(sorted[0], (map.get(sorted[0]) ?? 0) + 1)
    }
    console.log(map)
}


console.log('sortRandom(arr)', sortRandom(arr))