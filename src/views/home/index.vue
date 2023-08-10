<template>
  <div class="index">
    <div class="index-header">
      <h1>{{ title }}</h1>
    </div>

    <a-space>
      <a-button type="primary">Primary</a-button>
      <a-button>Secondary</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button type="outline">Outline</a-button>
      <a-button type="text">Text</a-button>
    </a-space>
  </div>
  <HelloWorld :msg="msg"></HelloWorld>
</template>

<script setup lang="ts">
/**
 * @desc 首页
 * @author changz
 * */

import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const title = ref<string>('首页')
const msg = ref<string>('hello world!')
</script>

<style lang="less" scoped>
  .index {
    .flex_center();
    width: 100%;
    height: 400px;
  }
</style>