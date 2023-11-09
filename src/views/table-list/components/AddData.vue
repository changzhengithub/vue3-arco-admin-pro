<template>
  <a-modal :visible="true" title="添加用户" :width="540" title-align="start" @cancel="closeDialog" :mask-closable="false" unmountOnClose>
    <a-form ref="formRef" :model="formData" :rules="formRules" :label-col-props="{ span: 4 }" :wrapper-col-props="{ span: 18 }">
      <a-form-item label="Name" field="name" :validate-trigger="['blur']">
        <a-input v-model="formData.name" :max-length="50" show-word-limit placeholder="请输入" allow-clear />
      </a-form-item>
      <a-form-item label="Salary" field="salary" :validate-trigger="['blur']">
        <a-input-number v-model="formData.salary" placeholder="请输入" :precision="0" :min="0" :max="1000" allow-clear />
      </a-form-item>
      <a-form-item label="Type" field="type" :validate-trigger="['change']">
        <a-select v-model="formData.type" placeholder="请选择" allow-clear>
          <a-option :value="1">类型1</a-option>
          <a-option :value="2">类型2</a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Email" field="email" :validate-trigger="['blur']">
        <a-input v-model="formData.email" :max-length="30" placeholder="请输入" allow-clear />
      </a-form-item>
      <a-form-item label="Address" field="address" :validate-trigger="['blur']">
        <a-textarea v-model="formData.address" placeholder="请输入" :auto-size="{ minRows: 3 }" :max-length="500" allow-clear show-word-limit />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="closeDialog">取消</a-button>
      <a-button type="primary" :loading="saveLoad" @click="confirmSubmit">确认</a-button>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
/**
 * @description 添加用户
 * @author
 * */
import { reactive, ref, onMounted } from 'vue'
import regExp from '@/utils/regExp'
import useGlobalProperties from '@/hooks/globalProperties'

import type { FormInstance } from '@arco-design/web-vue/es/form'
import type { TableInfo } from '../types'

const { global } = useGlobalProperties()

// 接收参数
const props = withDefaults(
  defineProps<{
    id?: string
    recordData: TableInfo
  }>(),
  {
    recordData: () => ({} as TableInfo)
  }
)

// 定义事件
const emit = defineEmits<{
  CLOSE_EVENT: [formData?: TableInfo]
}>()



const formRef = ref<FormInstance>()
const saveLoad = ref(false) // 保存中

const formRules = {
  name: [{ required: true, message: '请输入名称' }],
  type: [{ required: true, message: '请选择类型' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { match: regExp.emailReg, message: '邮箱格式错误' }
  ]
}

let formData = reactive<TableInfo>({
  key: '',
  name: '',
  type: undefined,
  salary: 0,
  email: '',
  address: ''
})


console.log(props.recordData)

onMounted(() => {
  formData = props.recordData
})

// 弹出层取消操作
const closeDialog = () => {
  emit('CLOSE_EVENT')
}

// 确认添加
const confirmSubmit = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      saveLoad.value = true
      setTimeout(() => {
        saveLoad.value = false
        global?.$message.success('操作成功')
        emit('CLOSE_EVENT', formData)
      }, 2000)
    } else {
      const errInfo = Object.values(errors)
      errInfo.forEach((item, index) => {
        if (index === 0) global?.$message.warning(item.message)
      })
    }
  })
}
</script>
<style lang="less" scoped>
.applay-pay {
  width: 100%;
  padding: 0 50px 0 30px;
}
</style>
