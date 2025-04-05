/**
 * @description 腾讯爱考题目-来自牛客
 * @url https://juejin.cn/post/7406150677225898023
 */

// ps: 关键设计思路（针对于restFirst函数）
// 1.任务队列机制
// 2.同步任务和异步任务的方式。异步执行控制

// 写一个hardMan函数，满足控制台打印效果如下：
// ===============================================
// hardMan('潘潘')
//> Hi! I am 潘潘.
// =============================================== 
// hardMan('潘潘').study('Project')
//> Hi! I am 潘潘.
//> I am studying 敲码.
// ===============================================
// hardMan('潘潘').rest(3).study('敲码')
//> Hi! I am 潘潘.
// 此时等待三秒钟
//> Wait 3 seconds.
//> I am studying 敲码.
// ===============================================
// hardMan('潘潘').restFirst(3).study('敲码')
// 此时等待三秒钟
//> Wait 3 seconds.
//> Hi! I am 潘潘.
//> I am studying 敲码.
// ===============================================

async function sleep(seconds) {
    await new Promise(resolve => {
        setTimeout(() => {
            console.log(`Wait ${seconds} seconds.`);
            resolve()
        }, seconds * 1000);
    })
}


// 函数式类的写法
function hardManClass(name) {
    this.task = []

    setTimeout(async () => {
        for (let tak of this.task) {
            await tak()
        }
    }, 0);


    this.task.push(() => {
        return new Promise(resolve => {
            console.log(`Hi! I am ${name}.`);
            resolve()
        })
    })

    this.study = function (studyName) {
        this.task.push(() => {
            return new Promise(resolve => {
                console.log(`I am studying ${studyName}.`);
                resolve()
            })
        })
        return this;
    }

    this.rest = function (time) {
        this.task.push(async () => {
            await sleep(time)
        })
        return this
    }

    this.restFirst = function (time) {
        this.task.unshift(async () => {
            await sleep(time)
        })
        return this
    }

    return this
}

function hardMan(name) {
    return new hardManClass(name)
}


// hardMan('潘潘')
// hardMan('潘潘').study('Project')
hardMan('潘潘').rest(3).study('敲码')
// hardMan('潘潘').restFirst(3).study('敲码')
