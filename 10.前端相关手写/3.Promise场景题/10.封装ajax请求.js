function axios(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("Get", url)
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                return
            }
            if (this.status >= 200 && this.status < 400) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.onerror = function () {
            reject(new Error(this.statusText))
        }

        //设置响应数据类型
        xhr.setRequestHeader("Accept", "application/json")
        xhr.send()
    })
}
