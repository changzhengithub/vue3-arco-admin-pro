/**
 * 接口请求数据通用返回格式
 * @desc 在Api接口配置时使用
 * */
interface ApiResponseData<T> {
  code: number
  data: T
  message: string
  [key: string]: any
}