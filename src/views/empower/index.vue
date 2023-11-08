<template>
  <div class="empower">
    <div class="empower-wrap">
      <div class="wrap-form">
        <a-form ref="empower" :model="formData" :rules="formRule" :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}">
          <a-form-item field="name" label="用户名" :validate-trigger="['blur']">
            <a-input v-model="formData.name" size="large" placeholder="请输入用户名" allow-clear>
              <template #prefix><icon-user /></template>
            </a-input>
          </a-form-item>
          <a-form-item field="password" label="密码" :validate-trigger="['blur']">
            <a-input-password v-model="formData.password" size="large" placeholder="请输入密码" allow-clear>
              <template #prefix><icon-lock /></template>
            </a-input-password>
          </a-form-item>
          <!-- <a-form-item field="code" label="验证码" :validate-trigger="['blur']">
            <a-input v-model="formData.code" size="large" placeholder="请输入验证码" allow-clear @press-enter="submitForm">
              <template #prefix><icon-safe /></template>
            </a-input>
            <div class="form-img" @click="getVerifyCode">
              <img v-if="!codeLoad" :src="formData.verifyImg" alt="">
              <icon-loading v-else />
            </div>
          </a-form-item> -->
          <a-form-item :wrapper-col-props="{offset: 4}">
            <a-button type="primary" :loading="submitLoad" @click="submitForm">提交</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @desc 登录
 * @author changz
 * */
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEmpowerStore } from '@/stores/modules/empower'
import useGlobalProperties from '@/hooks/globalProperties'

import type { FormInstance } from '@arco-design/web-vue/es/form'

// import { captchaApi } from '@/api/empower'

const { global } = useGlobalProperties()
const router = useRouter()
const empowerStore = useEmpowerStore()

const empower = ref<FormInstance>()
const submitLoad = ref(false)
// const codeLoad = ref(false)
const formData = reactive({
  name: 'admin',
  password: 'admin',
  code: '',
  verifyImg: '',
  key: ''
})
const formRule = reactive({
  name: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  code: [{ required: true, message: '请输入验证码' }]
})

onMounted(() => {
  // getVerifyCode()
})

// 获取验证码
// const getVerifyCode = () => {
//   codeLoad.value = true
//   captchaApi().then(res => {
//     codeLoad.value = false
//     if (res.code !== 200) {
//       global?.$notification.warning({
//         title: '提示',
//         content: res.msg
//       })
//       return
//     }
//     const { img, key } = res.data
//     formData.verifyImg = img
//     formData.key = key
//     formData.code = ''
//   }).catch(err => {
//     codeLoad.value = false
//     global?.$notification.warning({
//       title: '提示',
//       content: err.message
//     })
//   })
// }

const submitForm = () => {
  empower.value?.validate(errors => {
    if (!errors) {
      // const { name, password, code, key } = formData
      const { name, password } = formData
      const params = {
        name,
        password
        // code,
        // key
      }
      submitLoad.value = true
      empowerStore.userLogin(params)
        .then((res) => {
          submitLoad.value = false
          if (res.code !== 200) {
            global?.$notification.error({
              title: '错误',
              content: res.message
            })
            return
          }
          router.push({ path: '/' })
          // 延迟 1 秒显示欢迎信息
          setTimeout(() => {
            global?.$notification.success({
              title: '欢迎',
              content: '欢迎回来'
            })
          }, 1000)
        })
        .catch(err => {
          submitLoad.value = false
          global?.$notification.error({
            title: '错误',
            content: err.message
          })
        })
    } else {
      global?.$message.warning('表单填写不完整！')
    }
  })
}

</script>

<style lang="less" scoped>
.empower {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login-bg.jpg') center center no-repeat;
  background-size: 100% 100%;
  .empower-wrap {
    .position_center();
    width: 500px;
    .wrap-form {
      width: 100%;
      padding: 50px 30px 20px 30px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .form-img {
        width: 140px;
        height: 34px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>