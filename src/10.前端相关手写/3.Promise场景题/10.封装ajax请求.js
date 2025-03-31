/**
 * 封装 ajax 请求
 * @param {string|object} options 请求配置或URL
 * @param {string} options.url 请求地址
 * @param {string} options.method 请求方法
 * @param {object} options.headers 请求头
 * @param {object} options.data 请求数据
 * @param {number} options.timeout 超时时间
 */
function axios(options) {
    if (typeof options === 'string') {
        options = {
            url: options
        }
    }
    const {
        url,
        method = 'GET',
        headers = {},
        data = null,
        timeout = 5000
    } = options

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        // 设置超时
        xhr.timeout = timeout
        xhr.ontimeout = () => reject(new Error('请求超时'))

        // 监听请求状态
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return

            if (this.status >= 200 && this.status < 400) {
                let response
                try {
                    response = JSON.parse(this.response)
                } catch (e) {
                    response = this.response
                }
                resolve(response)
            } else {
                reject(new Error(this.statusText || '请求失败'))
            }
        }

        // 错误处理
        xhr.onerror = function () {
            reject(new Error(this.statusText || '网络错误'))
        }

        // 处理请求方法
        xhr.open(method.toUpperCase(), url, true)

        // 设置默认请求头
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Accept', 'application/json')

        // 设置自定义请求头
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key])
        })

        // 发送请求
        let body = null
        if (data) {
            body = typeof data === 'object' ? JSON.stringify(data) : data
        }
        xhr.send(body)
    })
}

// 添加便捷方法
axios.get = function (url, options = {}) {
    return axios({
        ...options,
        url,
        method: 'GET'
    })
}

axios.post = function (url, data, options = {}) {
    return axios({
        ...options,
        url,
        method: 'POST',
        data
    })
}

// 使用示例
async function example() {
    try {
        // GET 请求
        const getData = await axios.get('https://api.example.com/data', {
            headers: {
                'Authorization': 'Bearer token'
            },
            timeout: 3000
        })

        // POST 请求
        const postData = await axios.post('https://api.example.com/create', {
            name: 'test',
            age: 18
        }, {
            headers: {
                'X-Custom-Header': 'value'
            }
        })

        // 直接使用
        const response = await axios({
            url: 'https://api.example.com/update',
            method: 'PUT',
            data: { id: 1 },
            headers: {
                'Authorization': 'Bearer token'
            }
        })
    } catch (error) {
        console.error('请求失败:', error.message)
    }
}