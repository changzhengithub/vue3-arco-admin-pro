<template>
  <div class="index">
    <h1>{{title}}</h1>
  </div>
</template>

<script setup lang="ts" name="WangEditor">
import { ref } from 'vue'
const title = ref('暂时未找到一款好用的vue3富文本插件')
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  padding: 20px;
  background-color: #fff;
}
</style>