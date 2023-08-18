<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref<string>('推广页')
</script>

<style lang="less" scoped></style>