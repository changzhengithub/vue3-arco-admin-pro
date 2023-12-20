<template>
  <div class="index">
    <a-space>
      <h1>{{age}}</h1>
      <h1>{{msg}}</h1>
      <h1>{{tableData}}</h1>
    </a-space>
    <div>
      <a-button type="outline" @click="sendEvent">提交事件</a-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="EmeitProps">
import { reactive } from 'vue'

import type { TableInfo, StateData } from '../types'

// 接收参数
// const props = defineProps<{
//   title: string
//   likes?: number
// }>()
// 定义默认值
const props = withDefaults(defineProps<{
  age: number
  msg?: string
  tableData: TableInfo[]
}>(), {
  age: 18,
  tableData: () => []
})
// 定义事件
const emit = defineEmits<{
  'sendSome': [] // 什么都不传
  'sendMsg': [id: number] // 传递一个参数
  'sendMulMsg': [id: number, name: string] // 传递多个参数
  'sendObjMsg': [obj: StateData] // 传递一个对象
  'sendArrMsg': [arr: TableInfo[]] // 传递一个数组
  'sendOptMsg': [id?: number] // 可选参数
}>()


const state = reactive<StateData>({
  name: 'xxx',
  count: 0,
  type: undefined,
  data: '2023-01-01',
  status: 0
})

console.log(props)

const sendEvent = () => {
  emit('sendMsg', 1)
  emit('sendMulMsg', 1, 'test')
  emit('sendObjMsg', state)
  emit('sendArrMsg', props.tableData)
  emit('sendOptMsg')
}

</script>
<style lang="less" scoped>
  .index {
    width: 100%;
  }
</style>