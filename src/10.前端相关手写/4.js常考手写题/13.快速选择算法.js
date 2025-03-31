function quickSelect(arr, k) {
    // 检查 k 是否越界
    if (k < 0 || k >= arr.length) return -1;
    const randomIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[randomIndex];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (i === randomIndex) continue;
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // 如果 k 等于 left 数组的长度，说明基准元素就是第 k 小的元素
    if (k === left.length) {
        return pivot;
    }
    // 如果 k 小于 left 数组的长度，在 left 数组中继续查找
    if (k < left.length) {
        return quickSelect(left, k);
    } else {
        // 如果 k 大于 left 数组的长度，在 right 数组中继续查找
        return quickSelect(right, k - left.length - 1);
    }
}
console.log(quickSelect([1, 2, 3, 4, 5, 6], 3), '>>>>');