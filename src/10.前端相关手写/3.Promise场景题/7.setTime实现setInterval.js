// TODO:实现取消
function mySetInterval(callback, delay) {
    const recurit = () => {
        setTimeout(() => {
            callback()
            recurit()
        }, delay)
    }
    recurit()
}
mySetInterval(() => {
    console.log("111")
}, 1000)
