import fetch from "node-fetch"
setInterval(() => {
    fetch(
        "https://www.yuketang.cn/video-log/get_video_watch_progress/?cid=4654849&user_id=61258952&classroom_id=21340895&video_type=video&vtype=rate&video_id=47502169&snapshot=1",
        {
            headers: {
                accept: "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "no-cache",
                "classroom-id": "21340895",
                pragma: "no-cache",
                priority: "u=1, i",
                "sec-ch-ua": '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "university-id": "2656",
                "uv-id": "2656",
                "x-tt-env": "ppe_dev",
                "x-use-ppe": "1",
                "xt-agent": "web",
                xtbz: "ykt",
                cookie: "csrftoken=iyRpnO5V1GdJqWFmESfPWmqvNZb3MHCS; sessionid=wrmv5r1m964f2zgvvqo500uqnedubik1; django_language=zh-cn; classroomId=21340895; classroom_id=21340895",
                Referer: "https://www.yuketang.cn/v2/web/xcloud/video-student/21340895/47502169",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            body: null,
            method: "GET",
        }
    )
        .then((res) => {
            console.log(res)
        })
        .then((res) => {
            // console.log("res", res)
        })
}, 30000)
