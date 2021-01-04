import fly from "flyio";
import { ElMessage } from 'element-plus';

//创建实例
//const fly = new fly

//设置后端地址
fly.config.baseURL = process.env.VUE_APP_URL;
//设置超时
fly.config.timeout = process.env.VUE_APP_API_TIMEOUT;
//设置公共的Get参数
//fly.config.params={"token":"testtoken"};

//添加请求拦截器
fly.interceptors.request.use((request) => {
    request.headers["X-Tag"] = "mufaStar";
    if (request.method !== "GET" && !request.headers["Content-Type"]) {
        request.headers["Content-Type"] = "application/json;charset=utf-8";

    }
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        // 只返回 code == 200 的请求
        if (response.data.code == 200) {
            return response.data
        }
        ElMessage.error(response.data.message)
        if (response.data.code === 401) {
            location.reload()
        }
        return Promise.reject(response.data.message);
    },
    (err) => {
        console.log(err)
        ElMessage.error(err.message)
    }
)

export default fly