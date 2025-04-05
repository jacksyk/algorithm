function task(time = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const timestamp = (Date.now() / 1000) | 0
            resolve(timestamp)
        }, time)
    }).then((res) => {
        console.log('res', res)
    })
}

async function concurrent(tasks, max = 10) {
    const results = []
    const poolList = new Set()
    for (let i of tasks) {
        if (poolList.size === max) {
            await Promise.race(poolList)
        }
        let task = i()
        results.push(task)
        poolList.add(task)
        task.then(() => poolList.delete(task))
    }
    return Promise.allSettled(results)
}

concurrent([task, () => task(2000), task, task, task, task, task, task, task], 2).then((res) => {
    console.log(res)
})
