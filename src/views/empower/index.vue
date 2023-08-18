<template>
  <div class="empower">
    <div class="empower-wrap">
      <div class="wrap-form">
        <a-form ref="empower" :model="formData" :rules="formRule" :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}">
          <a-form-item field="username" label="用户名">
            <a-input v-model="formData.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item field="password" label="密码">
            <a-input v-model="formData.password" placeholder="请输入密码" />
          </a-form-item>
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
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useEmpowerStore } from '@/stores/modules/empower'
import type { FormInstance } from '@arco-design/web-vue/es/form'

const instance = getCurrentInstance()
const router = useRouter()
const empowerStore = useEmpowerStore()

const empower = ref<FormInstance>()
const submitLoad = ref(false)
const formData = reactive({
  username: 'admin',
  password: 'admin'
})
const formRule = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const submitForm = () => {
  empower.value?.validate(errors => {
    if (!errors) {
      const { username, password } = formData
      const params = {
        username,
        password
      }
      submitLoad.value = true
      empowerStore.userLogin(params)
        .then((res) => {
          submitLoad.value = false
          if (res.code !== 200) {
            instance?.proxy?.$notification.error({
              title: '错误',
              content: res.message
            })
            return
          }
          router.push({ path: '/' })
          // 延迟 1 秒显示欢迎信息
          setTimeout(() => {
            instance?.proxy?.$notification.success({
              title: '欢迎',
              content: '欢迎回来'
            })
          }, 1000)
        })
        .catch(err => {
          submitLoad.value = false
          instance?.proxy?.$notification.error({
            title: '错误',
            content: err.message
          })
        })
    } else {
      instance?.proxy?.$message.warning('表单填写不完整！')
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
    }
  }
}
</style>