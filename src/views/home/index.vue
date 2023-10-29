<template>
  <div class="index">
    <div class="index-header">
      <h1>{{ title }}</h1>
      <h2>主题颜色：{{store.appName}}</h2>
      <ArcoIcon icon="icon-tag" size="30" :style="{color: 'blue'}"></ArcoIcon>

      <icon-font type="icon-CEO-female" :size="30" />
      <a-input :style="{width:'320px'}" placeholder="Please enter something" allow-clear v-focus />
    </div>
    <a-space>
      <a-button v-permission="'home'" type="primary" @click="switchDarkTheme">深色主题</a-button>
      <a-button v-if="$hasPer('home')" type="outline" @click="switchWhiteTheme">浅色主题</a-button>
    </a-space>
    <HelloWorld :msg="msg"></HelloWorld>
  </div>
</template>

<!-- If you want the include property of keep-alive to take effect, you must name the component -->
<script setup lang="ts" name="Home">
/**
 * @desc 首页
 * @author changz
 * */

import { ref, getCurrentInstance } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import HelloWorld from './components/HelloWorld.vue'
import ArcoIcon from '@/components/ArcoIcon'

const instance = getCurrentInstance()

console.log(instance?.proxy?.$hasPer('home'))

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