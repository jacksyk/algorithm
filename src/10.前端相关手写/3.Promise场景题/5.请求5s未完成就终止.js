// AbortController 它能够中止 fetch 请求、各种响应主体或者流的消耗。
// @url https://juejin.cn/post/7112699475327615006

/**
 * 发起请求，如果超过指定时间未完成则终止
 * @param {string} url 请求地址
 * @param {number} timeout 超时时间（毫秒）
 */
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController(); // ps:可以丢弃请求的API
    const signal = controller.signal;

    // 创建一个超时Promise
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            controller.abort();
            reject(new Error(`请求超时: ${timeout}ms`));
        }, timeout);
    });

    try {
        // 使用 Promise.race 竞争，谁先完成用谁的结果
        const response = await Promise.race([
            fetch(url, { signal }),
            timeoutPromise
        ]);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('请求已被终止');
        }
        throw error;
    }
}

// 使用示例
async function example() {
    try {
        // 模拟一个可能超时的请求
        const data = await fetchWithTimeout('https://api.example.com/data', 5000);
        console.log('请求成功:', data);
    } catch (error) {
        console.error('请求失败:', error.message);
    }
}