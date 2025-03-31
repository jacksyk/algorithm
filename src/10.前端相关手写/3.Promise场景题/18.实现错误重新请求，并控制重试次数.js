function retryRequest(requestFn, maxRetries = 3, delay = 1000) {
  return new Promise(async (resolve, reject) => {
    let retries = 0;

    const attempt = async () => {
      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        retries++;
        if (retries > maxRetries) {
          reject(`请求失败，已达最大重试次数（${maxRetries}次）`);
        } else {
          console.log(` 请求失败，第 ${retries} 次重试...`);
          setTimeout(attempt, delay);
        }
      }
    };

    await attempt();
  });
}