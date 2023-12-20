<template>
  <div class="index">
    <a-space>
      <h1>{{title}}</h1>
      <h1>{{age}}</h1>
      <h1>{{title1}}</h1>
      <h1>{{age1}}</h1>
    </a-space>
  </div>
</template>

<script setup lang="ts" name="RefReactive">
import { ref, reactive } from 'vue'

import useGlobalProperties from '@/hooks/globalProperties'

const { global } = useGlobalProperties()
console.log(global)


// ref
const title = ref<string>('首页')
const age = ref<number>(100)
const tableList = ref<number[]>([1, 2, 3, 4, 5])

const title1 = ref('首页')
const age1 = ref(100)

age1.value = 200

console.log(title.value)
console.log(age.value)
console.log(title1.value)
console.log(age1.value)
console.log(tableList.value)

// reactive
interface StateData {
  name: string
  count: number
  type: undefined | ''
  date?: string
  [key: string]: any
}
const state = reactive<StateData>({
  name: 'xxx',
  count: 0,
  type: undefined,
  data: '2023-01-01',
  status: 0
})


state.count = 100
console.log(state)
</script>
<style lang="less" scoped>
  .index {
    width: 100%;
  }
</style>