<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts" name="MessageCenter">
/**
 * @desc 消息中心
 * @author changz
 * */

import { ref } from 'vue'
const title = ref<string>('消息中心')
</script>

<style lang="less" scoped></style>