// 红灯3秒亮一次，绿灯2秒亮一次，黄灯1秒亮一次；如何让三个灯不断交替重复亮灯？
// 要求：用Promise实现
function red() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("red")
            resolve()
        }, 3000)
    })
}
function green() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("green")
            resolve()
        }, 2000)
    })
}
function yellow() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("yellow")
            resolve()
        }, 1000)
    })
}

// 递归
const step = () => red().then(() => green().then(() => yellow().then(() => step())))
step()

// async await实现
const taskRunner = async () => {
    await red()
    await green()
    await yellow()
    taskRunner()
}

taskRunner()
