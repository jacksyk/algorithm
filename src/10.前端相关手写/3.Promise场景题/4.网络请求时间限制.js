// 网络请求，超过2s就报错，小于2s返回正常结果
function Limit(promises) {
    return new Promise((resolve, reject) => {
        Promise.race([...promises, requestErr()])
            .then((res) => {
                console.log("成功")
                resolve()
            })
            .catch((err) => {
                console.log("失败")
                reject()
            })
    })
}

const requestPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("请求成功")
            resolve()
        }, 1000)
    })
}

const requestErr = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("请求失败")
            reject()
        }, 2000)
    })
}

Limit([requestPromise()])
