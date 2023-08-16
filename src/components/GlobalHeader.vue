<template>
  <div class="global-header">
    <div class="header-left">
      <a-button shape="round" @click="toggleCollapse">
        <icon-menu-unfold v-if="collapsed" />
        <icon-menu-fold v-else />
      </a-button>
    </div>
    <div class="header-right">
      <a-dropdown trigger="hover" position="bottom">
        <a-badge :count="noticeList.length" style="width:26px;margin-right:12px">
          <icon-notification class="right-notice"/>
        </a-badge>
        <template #content>
          <a-doption style="width: 180px">
            <div style="width:100%px;height:100%;color:#114BA3">
              <!-- <span style="margin-right:10px" @click="checkNoticeHistory">通知历史</span> -->
              <!-- <span style="margin-right:10px" v-if="noticeList.length" @click="readMsg(0)">全部已读</span> -->
            </div>
          </a-doption>
        </template>
      </a-dropdown>
      <a-dropdown trigger="hover" position="br">
        <div class="right-info">
          <a-avatar :size="36">
            <img :src="userInfo.avatar" alt="头像" />
          </a-avatar>
          <div class="info-detail">
            <div class="detail-name">{{ userInfo.name }}</div>
            <div class="detail-unit" v-if="userInfo.company_short_name">{{ userInfo.company_short_name }}</div>
          </div>
        </div>
        <template #content>
          <a-doption v-if="userInfo.is_admin != 1" style="width: 110px" @click="openPersonalInfo">
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
        <a-form-item field="old_pwd" label="旧密码">
          <a-input-password v-model="pwdFormData.old_pwd" placeholder="请输入旧密码" allow-clear/>
        </a-form-item>
        <a-form-item field="new_pwd" label="新密码">
          <a-input-password v-model="pwdFormData.new_pwd" placeholder="请输入新密码" allow-clear/>
        </a-form-item>
        <a-form-item field="confirm_pwd" label="确认密码">
          <a-input-password v-model="pwdFormData.confirm_pwd" placeholder="请输入确认密码" allow-clear/>
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref, getCurrentInstance, computed } from 'vue'
import storage from 'store'
import { useRouter } from 'vue-router'
import type { FormInstance } from '@arco-design/web-vue/es/form'

import { useEmpowerStore } from '@/stores/modules/empower'

const formRef = ref<FormInstance>()

import { logoutApi, updatePwdApi } from '@/api/empower'

const global = getCurrentInstance()?.appContext.config.globalProperties
const empowerStore = useEmpowerStore()
const router = useRouter()

// 自定义事件
const emit = defineEmits<{
  'COLLAPSE_EVENT': []
}>()

const collapsed = ref(false) // 折叠导航栏
const userInfo = computed(() => empowerStore.userInfo) // 个人信息
const noticeList = ref([])

const modifyPwdDialog = reactive({
  visible: false,
  confirmLoad: false
})
let pwdFormData = reactive({
  old_pwd: '',
  new_pwd: '',
  confirm_pwd: ''
})
const formRules = {
  old_pwd: [{ required: true, message: '请输入旧密码' }],
  new_pwd: [{ required: true, message: '请输入新密码' }],
  confirm_pwd: [{ required: true, message: '请输入确认密码' }]
}


// 折叠展开导航栏
const toggleCollapse = () => {
  collapsed.value = !collapsed.value
  emit('COLLAPSE_EVENT')
}

// 个人信息
const openPersonalInfo = () => {
  router.push({
    name: 'UserCenter'
  })
}

// 修改密码
const modifyPwd = () => {
  modifyPwdDialog.visible = true
  pwdFormData = {
    old_pwd: '',
    new_pwd: '',
    confirm_pwd: ''
  }
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
        global.$message.warning('两次密码必须一样!')
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
            global.$notification.error({
              title: '错误',
              content: res.msg
            })
            return
          }
          global.$message.success('操作成功，请重新登录！')
          storage.clearAll()
          setTimeout(() => {
            window.location.href = '/'
          }, 500)
        })
        .catch(err => {
          modifyPwdDialog.confirmLoad = false
          global.$notification.error({
            title: '错误',
            content: err.message
          })
        })
    } else {
      const errInfo = Object.values(errors)
      errInfo.forEach((item, index) => {
        if (index == 0) global.$message.warning(item.message)
      })
    }
  })
}

// 退出登录
const logoutSubmit = () => {
  global.$modal.warning({
    title: '提示',
    content: '确定要退出登录？',
    closable: true,
    onOk: () => {
      logoutApi()
        .then(res => {
          if (res.code != 200) {
            global.$notification.error({
              title: '错误',
              content: res.msg
            })
            return false
          }
          storage.clearAll()
          window.location.reload()
        })
        .catch(err => {
          global.$notification.error({
            title: '错误',
            content: err.message
          })
        })
    }
  })
}
</script>

<style lang="less" scoped>
.global-header {
  .flex_vertical_center_horizontal_between();
  width: 100%;
  height: 100%;
  padding: 0 24px;

  .header-right {
    display: flex;
    align-items: center;
    height: 100%;
    .right-app {
      width: 80px;
      height: 30px;
      margin-right: 20px;
      background-color: #eee;
      color: #333;
      line-height: 30px;
      text-align: center;
      .app-icon {
        margin-right: 5px;
      }
    }
    .right-notice {
      margin-right: 20px;
      font-size: 20px;
      cursor: pointer;
    }
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
}
// :deep(.arco-dropdown-option-content) {
//   display: inline-block;
//   width: 100%;
// }
</style>
