<template>
  <div class="index">
    <div class="index-header">
      <h1>{{ title }}</h1>
      <h2>主题颜色：{{store.theme}}</h2>
      <ArcoIcon icon="icon-tag" size="30" :style="{color: 'blue'}"></ArcoIcon>

      <icon-font type="icon-CEO-female" :size="30" />
    </div>
    <a-input v-model="text" placeholder="please enter your username..." />

    <a-space>
      <a-button type="primary" @click="switchDarkTheme">深色主题</a-button>
      <a-button type="outline" @click="switchWhiteTheme">浅色主题</a-button>
    </a-space>
    <HelloWorld :msg="msg"></HelloWorld>
  </div>
</template>

<script setup lang="ts" name="Home">
/**
 * @desc 首页
 * @author changz
 * */

import { ref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import HelloWorld from './components/HelloWorld.vue'
import ArcoIcon from '@/components/ArcoIcon'

const store = useAppStore()

const title = ref<string>('首页')
const text = ref<string>('')
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