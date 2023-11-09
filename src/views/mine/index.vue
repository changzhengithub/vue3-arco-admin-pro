<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
/**
 * @desc 我的
 * @author changz
 * */

import { ref } from 'vue'
const title = ref<string>('我的')
</script>

<style lang="less" scoped></style>