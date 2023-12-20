<template>
  <div class="index">
    <a-tabs v-model:active-key="activeTabKey">
      <a-tab-pane :key="1" title="ref/reactive类型声明">
        <RefReactive v-if="activeTabKey == 1"></RefReactive>
      </a-tab-pane>
      <a-tab-pane :key="2" title="传参">
        <EmeitProps
          v-if="activeTabKey == 2"
          :tableData="tableData"
          :age="1"
          @sendSome="getSome"
          @sendMsg="getMsg"
          @sendMulMsg="getMulMsg"
          @sendObjMsg="getObjMsg"
          @sendArrMsg="getArrMsg"
          @sendOptMsg="getOptMsg"
        >
        </EmeitProps>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<!-- If you want the include property of keep-alive to take effect, you must name the component -->
<script setup lang="ts" name="Example">
/**
 * @desc 示例
 * @author changz
 * */
import { ref, reactive } from 'vue'

import type { TableInfo, StateData } from './types'

import RefReactive from './components/RefReactive.vue'
import EmeitProps from './components/EmeitProps.vue'

const activeTabKey = ref(1)

const tableData = reactive<TableInfo[]>([
  {
    key: 'xxx',
    name: 'xxx',
    salary: 0,
    address: '安徽省',
    email: '456464876@qq.com',
    type: undefined
  }
])


// 接收参数
const getSome = (res: any) => {
  console.log(res)
}
const getMsg = (id: number) => {
  console.log(id)
}
const getMulMsg = (id: number, name: string) => {
  console.log(id)
  console.log(name)
}
const getObjMsg = (obj: StateData) => {
  console.log(obj)
}
const getArrMsg = (arr: TableInfo[]) => {
  console.log(arr)
}
const getOptMsg = (id?: number) => {
  console.log(id)
}
</script>

<style lang="less" scoped>
  .index {
    width: 100%;
    padding: 20px;
    background-color: #fff;
  }
</style>