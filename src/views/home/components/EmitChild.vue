<template>
  <div class="greet">
    <h1>提交组件</h1>
    <a-button type="primary" @click="sendEmit">发送事件</a-button>
  </div>
</template>

<script setup lang="ts">
/**
 * @desc 首页-中央事件
 * @author changz
 * */
import useGlobalProperties from '@/hooks/globalProperties'
const { global } = useGlobalProperties()
const sendEmit = () => {
  global?.$Bus.emit('MITT_GET_USERINFO', { name: 'xxx' })
}
</script>


<style lang="less" scoped>

</style>
