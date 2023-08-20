<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-CN'
</script>

<!-- 针对全局样式 -->
<style lang="less" scoped></style>
