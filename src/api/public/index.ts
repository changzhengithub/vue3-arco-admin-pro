/**
 * @description 全局公共 Api
 * @author changz
 * */

 import request from '@/utils/request'
 import type * as Public from './types'
 
 // 接口地址
 const api = {
  uploadFile: '/api/uploadFile' // 上传
}
 
 // 上传
 export function uploadFileApi(data: Public.UpdatePwdRequestData, { onUploadProgress }) {
   return request<Public.UpdatePwdResponseData>({
     url: api.uploadFile,
     method: 'post',
     data,
     onUploadProgress
   })
 }