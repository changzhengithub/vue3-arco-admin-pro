<template>
  <div>
    <h1>{{ title }}</h1>
    <a-input v-model="text" placeholder="please enter your username..." />
  </div>
</template>

<script setup lang="ts" name="RoleManage">
import { ref } from 'vue'
const title = ref<string>('角色管理')
const text = ref<string>('')
</script>

<style lang="less" scoped></style>