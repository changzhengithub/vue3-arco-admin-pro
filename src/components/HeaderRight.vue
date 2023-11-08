<template>
  <div class="header-right">
    <a-space size="large">
      <a-tooltip content="系统设置">
        <icon-settings size="20" :style="{ color: '#393d44', cursor: 'pointer' }" @click="gotoPage('SystemSetting')" />
      </a-tooltip>
      <a-tooltip content="消息通知">
        <a-badge :count="noticeList.length" style="width:26px;margin-right:12px">
          <icon-notification size="20" :style="{ color: '#393d44', cursor: 'pointer' }" @click="gotoPage('MessageCenter')" />
        </a-badge>
      </a-tooltip>
    </a-space>

    <a-dropdown trigger="hover" position="br">
      <div class="right-info">
        <a-avatar :size="36">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像" />
          <icon-user v-else />
        </a-avatar>
        <div class="info-detail">
          <div class="detail-name">{{ userInfo.name }}</div>
        </div>
      </div>
      <template #content>
        <a-doption v-if="userInfo.is_admin != 1" style="width: 110px" @click="gotoPage('UserCenter')">
          <template #icon>
            <icon-user />
          </template>
          个人信息
        </a-doption>
        <a-doption @click="modifyPwd">
          <template #icon>
            <icon-sync />
          </template>
          修改密码
        </a-doption>
        <a-doption @click="logoutSubmit">
          <template #icon>
            <icon-export />
          </template>
          退出登录
        </a-doption>
      </template>
    </a-dropdown>
  </div>

  <!-- 修改密码 -->
  <a-modal
    :visible="modifyPwdDialog.visible"
    title="修改密码"
    title-align="start"
    :width="500"
    :mask-closable="false"
    :ok-loading="modifyPwdDialog.confirmLoad"
    @ok="confirmModifyPwd"
    @cancel="closeModifyPwd"
    unmountOnClose
  >
    <a-form ref="formRef" :model="pwdFormData" :rules="formRules" :label-col-props="{span: 5}" :wrapper-col-props="{span: 18}">
      <a-form-item field="old_pwd" label="旧密码" :validate-trigger="['blur']">
        <a-input-password v-model="pwdFormData.old_pwd" placeholder="请输入旧密码" allow-clear/>
      </a-form-item>
      <a-form-item field="new_pwd" label="新密码" :validate-trigger="['blur']">
        <a-input-password v-model="pwdFormData.new_pwd" placeholder="请输入新密码" allow-clear/>
      </a-form-item>
      <a-form-item field="confirm_pwd" label="确认密码" :validate-trigger="['blur']">
        <a-input-password v-model="pwdFormData.confirm_pwd" placeholder="请输入确认密码" allow-clear/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

import storage from 'store'
import { useRouter } from 'vue-router'
import { useEmpowerStore } from '@/stores/modules/empower'
import useGlobalProperties from '@/hooks/globalProperties'


import type { FormInstance } from '@arco-design/web-vue/es/form'

import { logoutApi, updatePwdApi } from '@/api/empower'

const formRef = ref<FormInstance>()


const { global } = useGlobalProperties()
const empowerStore = useEmpowerStore()
const router = useRouter()

const userInfo = computed(() => empowerStore.userInfo) // 个人信息
const noticeList = ref([])

const modifyPwdDialog = reactive({
  visible: false,
  confirmLoad: false
})
const pwdFormData = reactive({
  old_pwd: '',
  new_pwd: '',
  confirm_pwd: ''
})
const formRules = {
  old_pwd: [{ required: true, message: '请输入旧密码' }],
  new_pwd: [{ required: true, message: '请输入新密码' }],
  confirm_pwd: [{ required: true, message: '请输入确认密码' }]
}


const gotoPage = (name: string) => {
  router.push({
    name
  })
}

// 修改密码
const modifyPwd = () => {
  modifyPwdDialog.visible = true
  pwdFormData.old_pwd = ''
  pwdFormData.new_pwd = ''
  pwdFormData.confirm_pwd = ''
}
const closeModifyPwd = () => {
  modifyPwdDialog.visible = false
}

// 确认修改密码
const confirmModifyPwd = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      const { old_pwd, new_pwd, confirm_pwd } = pwdFormData
      if (new_pwd !== confirm_pwd) {
        global?.$message.warning('两次密码必须一样!')
        return
      }
      const params = {
        old_pwd,
        new_pwd
      }
      modifyPwdDialog.confirmLoad = true
      updatePwdApi(params)
        .then(res => {
          if (res.code !== 200) {
            modifyPwdDialog.confirmLoad = false
            global?.$notification.error({
              title: '错误',
              content: res.msg
            })
            return
          }
          global?.$message.success('操作成功，请重新登录！')
          storage.clearAll()
          setTimeout(() => {
            window.location.href = '/'
          }, 500)
        })
        .catch(err => {
          modifyPwdDialog.confirmLoad = false
          global?.$notification.error({
            title: '错误',
            content: err.message
          })
        })
    } else {
      const errInfo = Object.values(errors)
      errInfo.forEach((item, index) => {
        if (index === 0) global?.$message.warning(item.message)
      })
    }
  })
}

// 退出登录
const logoutSubmit = () => {
  global?.$modal.warning({
    title: '提示',
    content: '确定要退出登录？',
    closable: true,
    onOk: () => {
      logoutApi()
        .then(res => {
          if (res.code !== 200) {
            global?.$notification.error({
              title: '错误',
              content: res.msg
            })
            return false
          }
          storage.clearAll()
          window.location.reload()
        })
        .catch(err => {
          global?.$notification.error({
            title: '错误',
            content: err.message
          })
        })
    }
  })
}
</script>

<style lang="less" scoped>
.header-right {
  display: flex;
  align-items: center;
  height: 100%;

  .right-info {
    height: 100%;
    .flex_vertical_center();

    .info-detail {
      .flex_direction_vertical_center();
      padding-left: 10px;
      text-align: left;
      cursor: pointer;
      .detail-name {
        height: 20px;
        line-height: 20px;
        margin-bottom: 2px;
        font-size: 14px;
        color: #333;
      }
      .detail-unit {
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #999;
        // border: 1px solid #165DFF;
      }
    }
  }
}
</style>