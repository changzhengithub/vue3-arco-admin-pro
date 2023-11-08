<template>
  <div class="greet">
    <h1>{{ msg }}</h1>
    <h1>{{ foo }}</h1>
  </div>
</template>

<script setup lang="ts">
/**
 * @desc 首页-组件
 * @author changz
 * */
import { inject } from 'vue'
import { PROVIDE_STRING } from '@/provide'
defineProps<{
  msg: string
}>()

const foo = inject(PROVIDE_STRING)
</script>


<style lang="less" scoped>

</style>
