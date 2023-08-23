/**
 * @description 全局公共 Api
 * @author changz
 * */

import request from '@/utils/request'
import type * as Public from './types'

// 接口地址
const api = {
  uploadFile: '/api/approval-flow/uploadFile', // 上传文件
  download: '/api/task/download' // 下载文件
}

// 上传文件
export function uploadFileApi(data: Public.UploadFormData, config: Public.ConfigData) {
  return request({
    url: api.uploadFile,
    method: 'post',
    data,
    onUploadProgress: config.onUploadProgress
  })
}

// 下载文件
export function downloadApi(params: Public.DownloadReq) {
  return request({
    url: api.download,
    method: 'get',
    params,
    responseType: 'blob'
  })
}