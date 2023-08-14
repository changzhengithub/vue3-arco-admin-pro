import axios from 'axios'
// import store from '@/store'
import storage from 'store'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN } from '@/constants/app'
import { Notification } from '@arco-design/web-vue'

let hasInvalid = false // 请求已失效，禁止重复提示

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 1000 * 60 * 10 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  if (error.response) {
    const data: any = error.response.data

    if (error.response.status === 404) {
      Notification.warning({
        title: '不存在该页面',
        content: data.msg
      })
      return new Promise(() => {})
    }

    if (error.response.status === 401) {
      if (hasInvalid) return new Promise(() => {})
      hasInvalid = true
      Notification.warning({
        title: '授权验证失败',
        content: '请重新登录'
      })
      storage.clearAll()
      setTimeout(() => {
        hasInvalid = false
        window.location.reload()
      }, 1000)
      return new Promise(() => {})
    }
    if (error.response.status === 415) {
      if (hasInvalid) return new Promise(() => {})
      hasInvalid = true
      Notification.warning({
        title: '系统授权过期',
        content: '请重新登录'
      })
      storage.clearAll()
      setTimeout(() => {
        hasInvalid = false
        window.location.href = '/'
      }, 1000)
      return new Promise(() => {})
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse) => {
  return response.data
}, errorHandler)

// 通过一个方法传入泛型，自定义接口返回格式
function createRequest<T = ApiResponseData<any>>(config: AxiosRequestConfig): Promise<T> {
  return request(config)
}

export default createRequest