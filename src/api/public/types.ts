import FormData from 'form-data'

// 上传文件
// 定义FormData格式上传类型
export interface UploadFormData extends FormData {
  append<T extends string | Blob>(
    name: string,
    value: T
  ): void
}
// 接口配置，类似于进度条headers等
export interface ConfigData {
  onUploadProgress?: ((progressEvent: any) => void)
  // ...其他配置
}
// export type UploadProgress = ((progressEvent: any) => void)

// 下载文件
export interface DownloadReq {
  id: number
}
export type DownloadRes = ApiResponseData<any>