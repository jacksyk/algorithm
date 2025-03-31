/** https://github.com/Sunny-117/js-challenges/issues/147 */
// async-pool思想 和 compose思想 基于递归

function limitPromiseAll(promises, limit, retryCount = 3) {
    return new Promise(async (resolve, reject) => {
        let count = 0
        const result = []
        const currentTask = new Set()

        // 添加重试包装函数
        const retry = async (fn, index) => {
            for (let i = 0; i < retryCount; i++) {
                try {
                    return await fn()
                } catch (err) {
                    if (i === retryCount - 1) throw err
                    console.log(`任务${index}第${i + 1}次重试`)
                }
            }
        }

        for (let i = 0; i < promises.length; i++) {
            if (currentTask.size >= limit) {
                await Promise.race(currentTask)
            }
            const promise = promises[i]
            const task = retry(promise, i).then(res => {
                result[i] = res
                currentTask.delete(task)
            }).catch(err => {
                reject(err)
            }).finally(() => {
                count++
                if (count === promises.length) {
                    resolve(result)
                }
            })
            currentTask.add(task)
        }
    })
}

// 测试用例
async function test() {
    // 模拟异步任务，返回一个 Promise 函数
    const createTask = (time, value) => () => {
        console.log(`开始任务 ${value}`);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`完成任务 ${value}`);
                resolve(value);
            }, time);
        });
    };

    // 创建测试任务
    const tasks = [
        createTask(1000, 1),  // 1秒后完成
        createTask(2000, 2),  // 2秒后完成
        createTask(1000, 3),  // 1秒后完成
        createTask(1500, 4),  // 1.5秒后完成
        createTask(500, 5),   // 0.5秒后完成
    ];

    try {
        console.time('总执行时间');
        const results = await limitPromiseAll(tasks, 2);  // 限制并发数为2
        console.timeEnd('总执行时间');
        console.log('所有任务执行结果:', results);
    } catch (err) {
        console.error('执行出错:', err);
    }
}

test();
