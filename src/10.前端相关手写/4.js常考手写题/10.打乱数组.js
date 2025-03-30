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
console.log('sortRandom(arr)', sortRandom(arr))