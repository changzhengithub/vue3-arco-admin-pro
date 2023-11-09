<template>
  <div class="index">
    <a-tabs v-model:active-key="tabKey">
      <a-tab-pane key="1" title="动态表单">
        <div class="index-module">
          <a-form ref="formRef" :model="formData" :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}">
            <a-form-item field="name" label="姓名" :rules="[{ required: true, message: '请输入姓名' }]" :validate-trigger="['blur']">
              <a-input v-model="formData.name" placeholder="请输入姓名" />
            </a-form-item>
            <a-form-item
              v-for="(item, index) of formData.postList"
              :field="`postList[${index}].value`"
              :label="`表单-${index}`"
              :key="index"
              :rules="[{ required: true, message: `请输入表单-${index}` }]"
              :validate-trigger="['blur']"
            >
              <a-input v-model="item.value" placeholder="请输入" />
              <a-space style="margin-left: 10px;">
                <a-button type="text" size="small" v-if="index <= 0" @click="handleAdd">添加</a-button>
                <a-button type="text" status="danger" size="small" v-if="formData.postList.length > 1" @click="handleDelete(index)">删除</a-button>
              </a-space>
            </a-form-item>
            <a-form-item :wrapper-col-props="{span: 18, offset: 4}">
              <a-button type="primary" @click="confirmSubmit">提交</a-button>
            </a-form-item>
          </a-form>
          <div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="多表单验证">
        <div class="index-module">
          <div class="module-add">
            <a-button long @click="addForm">添加</a-button>
          </div>
          <div class="module-wrap" v-for="(form, index) in formList" :key="index">
            <div class="wrap-header">
              <span>表单{{ index }}</span>
              <a-button v-if="formList.length > 1" type="text" status="danger" size="small" @click="deleteForm(index)">删除表单</a-button>
            </div>
            <div class="wrap-form">
              <a-form :ref="el => getRefs(el as FormInstance, index)" :model="form.formData" :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}">
                <a-form-item field="name" label="姓名" :rules="[{ required: true, message: '请输入姓名' }]" :validate-trigger="['blur']">
                  <a-input v-model="form.formData.name" placeholder="请输入姓名" />
                </a-form-item>
                <a-form-item field="type" label="类型" :rules="[{ required: true, message: '请选择类型' }]" :validate-trigger="['change']">
                  <a-select v-model="form.formData.type" placeholder="请选择" allow-clear>
                    <a-option :value="1">类型1</a-option>
                    <a-option :value="2">类型2</a-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </div>
          </div>
          <div class="module-add">
            <a-button type="primary" long @click="confirmValidate">表单验证</a-button>
          </div>
        </div>

        <!-- 动态获取 -->
        <!-- <a-form v-for="item in formList" :ref="el => getRefs(el)">
          <a-form-item></a-form-item>
        </a-form> -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts" name="FormModel">
/**
 * @desc 表单验证
 * @author changz
 * */

import { ref, reactive } from 'vue'
import useGlobalProperties from '@/hooks/globalProperties'

import type { FormInstance } from '@arco-design/web-vue/es/form'
import type { FormList } from './types'

const { global } = useGlobalProperties()

const tabKey = ref('1')


// 动态表单验证
const formRef = ref<FormInstance>()
const formData = reactive({
  name: '',
  postList: [{ value: '' }]
})
const handleAdd = () => {
  formData.postList.push({
    value: ''
  })
}
const handleDelete = (index: number) => {
  formData.postList.splice(index, 1)
}
const confirmSubmit = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      global?.$message.success('验证成功')
    } else {
      const errInfo = Object.values(errors)
      errInfo.forEach((item, index) => {
        if (index === 0) global?.$message.warning(item.message)
      })
    }
  })
}


// 多表单验证
const refList = ref<FormInstance[]>([])
const formList = ref<FormList[]>([
  {
    formData: {
      name: '',
      type: undefined
    }
  }
])

// 获取form列表
const getRefs = (el: FormInstance, index: number) => {
  refList.value[index] = el
}

const addForm = () => {
  formList.value.push({
    formData: {
      name: '',
      type: undefined
    }
  })
}
const deleteForm = (index: number) => {
  formList.value.splice(index, 1)
}

const confirmValidate = () => {
  console.log(refList.value)
  refList.value.forEach(item => {
    item?.validate(errors => {
      if (!errors) {
        global?.$message.success('验证成功')
      } else {
        const errInfo = Object.values(errors)
        errInfo.forEach((item, index) => {
          if (index === 0) global?.$message.warning(item.message)
        })
      }
    })
  })
}

</script>

<style lang="less" scoped>
.index {
  width: 100%;
  padding: 20px;
  background-color: #fff;

  .index-module {
    width: 600px;
    min-height: 500px;
    .module-add {
      width: 500px;
      margin-bottom: 20px;
    }
    .module-wrap {
      width: 500px;
      margin-bottom: 20px;
      border: 1px solid #eee;
      border-radius: 10px;
      .wrap-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid #eee;
      }
      .wrap-form {
        width: 100%;
        padding: 20px 0;
      }
    }
  }
}
</style>