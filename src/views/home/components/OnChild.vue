<template>
  <div class="greet">
    <h1>接收组件： {{sendMsg?.name}}</h1>
  </div>
</template>

<script setup lang="ts">
/**
 * @desc 首页-中央事件
 * @author changz
 * */

import { ref, onMounted, onUnmounted } from 'vue'
import useGlobalProperties from '@/hooks/globalProperties'
const { global } = useGlobalProperties()

// 接收事件
const sendMsg = ref({
  name: ''
})

onMounted(() => {
  global?.$Bus.on('MITT_GET_USERINFO', (params) => {
    sendMsg.value = params
  })
})

// 卸载事件
onUnmounted(() => {
  global?.$Bus.off('MITT_GET_USERINFO')
})
</script>


<style lang="less" scoped>

</style>
