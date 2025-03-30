// 实现一个抢红包算法，给你红包总数和总金额，去实现每个红包金额的随机分配，要尽可能做到公平

function prize(totalNum, count) {
    const res = new Array(count).fill(1) // 以分为单位
    let remain = totalNum * 100 - count * 1 // 减去已经分配的
    // 分配前 n - 1个人的红包
    for (let i = 0; i < count - 1; i++) {
        const max = Math.floor((remain / (count - i)) * 2)
        const random = Math.floor(Math.random() * max)
        console.log(random, remain)
        res[i] += random
        remain -= random
    }
    res[count - 1] += remain
    return res.map(item => (item / 100))
}

console.log('prize',prize(10,2))