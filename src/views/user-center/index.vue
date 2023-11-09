<template>
  <h1>{{ title }}</h1>
  <a-upload :show-file-list="false" @before-upload="beforeUpload" :custom-request="customRequest">
    <template #upload-button>
      <a-button type="primary" :loading="uploadLoad">
        <template #icon>
          <icon-upload />
        </template>
        <template #default>上传图片</template>
      </a-button>
    </template>
  </a-upload>
</template>

<script setup lang="ts" name="UserCenter">
/**
 * @desc 用户中心
 * @author changz
 * */

import { ref } from 'vue'
import useGlobalProperties from '@/hooks/globalProperties'

import FormData from 'form-data'
import type { RequestOption } from '@arco-design/web-vue/es/upload/interfaces'

import { uploadFileApi } from '@/api/public'


const { global } = useGlobalProperties()
const title = ref<string>('个人信息')
const uploadLoad = ref(false)
const percent = ref(0)

const beforeUpload = (file: File) => {
  const { name, size } = file
  const fileExtension = name.split('.').pop()
  const limitType = fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif'
  if (!limitType) {
    global?.$message.error('请上传 JPG、PNG、JPEG 或 GIF 格式图片!')
  }
  const limitSize = size / 1024 / 1024 < 8
  if (!limitSize) {
    global?.$message.error('文件不可大于 8MB!')
  }
  return limitType && limitSize
}

// 获取图片
const customRequest = (option: RequestOption): any => {
  const { fileItem } = option
  const { file } = fileItem
  const params = new FormData()
  params.append('file', file)
  uploadLoad.value = true
  // const controller = new AbortController()

  uploadFileApi(params, {
    onUploadProgress: (e: ProgressEvent) => {
      const completeProgress = (((e.loaded / e.total) * 100) / 100) | 0
      percent.value = completeProgress
    }
  })
    .then(res => {
      uploadLoad.value = false
      if (res.code !== 200) {
        global?.$notification.warning({
          title: '提示',
          content: res.msg
        })
        return false
      }
      global?.$message.success('上传成功')
      console.log(res)
      percent.value = 0
    })
    .catch(err => {
      uploadLoad.value = false
      global?.$notification.warning({
        title: '提示',
        content: err.message
      })
    })
}
</script>

<style lang="less" scoped></style>