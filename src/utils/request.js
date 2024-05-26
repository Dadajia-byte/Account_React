// axios 的封装处理
import axios from "axios";
import { getToken, removeToken } from "@/utils";
import router from "@/router";

// 1. 根域名配置
// 2. 超时时间
// 3. 请求拦截器 / 响应拦截器
const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
})

// 添加请求拦截器
// 在请求发送之前 做拦截 插入一些自定义的配置 【参数的处理】
request.interceptors.request.use((config) => {
    // 注入token
    const token = getToken()
    if (token) {
        config.headers.Authorization = `${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 监控401 token失效
    if (error.response.status === 401) {
        removeToken()
        router.navigate('/login')
        window.location.reload()
    }
    return Promise.reject(error)
})

export { request }