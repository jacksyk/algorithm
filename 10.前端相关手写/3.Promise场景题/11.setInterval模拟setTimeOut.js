function myTimeOut(cb, delay) {
    const timer = setInterval(() => {
        cb()
        clearInterval(timer)
    }, delay)
}
myTimeOut(() => console.log(111111), 1000)
