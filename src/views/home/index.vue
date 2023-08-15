<template>
  <div class="index">
    <div class="index-header">
      <h1>{{ title }}</h1>
      <h2>主题颜色：{{store.theme}}</h2>
      <!-- <ArcoIcon></ArcoIcon> -->
      <AIcon icon="icon-tag"></AIcon>
    </div>

    <a-space>
      <a-button type="primary" @click="switchDarkTheme">深色主题</a-button>
      <a-button type="outline" @click="switchWhiteTheme">浅色主题</a-button>
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
import { useAppStore } from '@/stores/modules/app'
import HelloWorld from './components/HelloWorld.vue'
// import ArcoIcon from '@/components/Icon'
import AIcon from '@/components/AIcon.vue'
// import icon from '@/components/Icon'

const store = useAppStore()

const title = ref<string>('首页')
const msg = ref<string>('hello world!')

console.log(import.meta.env.VITE_ENV)

const switchDarkTheme = () => {
  store.switchTheme('#000')
}
const switchWhiteTheme = () => {
  console.log(store)
  store.theme = '#fff'
}
</script>

<style lang="less" scoped>
  .index {
    .flex_center();
    width: 100%;
    height: 400px;
  }
</style>