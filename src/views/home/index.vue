<template>
  <div class="index">
    <a-row class="index-grid" :gutter="[24, 12]">
      <a-col :span="6">
        <a-card title="主题">
          <h1>主题：{{appStore.appName}}</h1>
          <a-space>
            <a-button type="primary" @click="switchDarkTheme">深色主题</a-button>
            <a-button type="outline" @click="switchWhiteTheme">浅色主题</a-button>
          </a-space>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="Icon图标">
          <h1>{{ title }}</h1>
          <ArcoIcon icon="icon-tag" size="30" :style="{color: 'blue'}"></ArcoIcon>
          <icon-font type="icon-CEO-female" :size="30" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="自定义指令">
          <a-input :style="{width:'320px'}" placeholder="Please enter something" allow-clear v-focus />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="权限指令">
          <a-space>
            <a-button v-permission="'home'" type="primary">主页权限按钮</a-button>
            <a-button v-if="$hasPer('home')" type="outline">主页权限按钮</a-button>
          </a-space>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="组件">
          <HelloWorld :msg="msg"></HelloWorld>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="hook使用">
          <h1>鼠标位置：{{x}}-{{y}}</h1>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="中央事件">
          <EmitChild></EmitChild>
          <OnChild></OnChild>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="文本省略">
          <Ellipsis :length="30" tooltip position="top" background-color="red">提示：This is a two-line tooltip content.This is a two-line tooltip content.</Ellipsis>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<!-- If you want the include property of keep-alive to take effect, you must name the component -->
<script setup lang="ts" name="Home">
/**
 * @desc 首页
 * @author changz
 * */

import { ref, provide } from 'vue'
import { PROVIDE_STRING } from '@/provide'

import { useAppStore } from '@/stores/modules/app'
import useMouse from '@/hooks/mouse'
import useGlobalProperties from '@/hooks/globalProperties'

import ArcoIcon from '@/components/ArcoIcon'
import HelloWorld from './components/HelloWorld.vue'
import EmitChild from './components/EmitChild.vue'
import OnChild from './components/OnChild.vue'
import Ellipsis from '@/components/Ellipsis/index'

const { global } = useGlobalProperties()
const appStore = useAppStore()

const title = ref<string>('首页')
const msg = ref<string>('hello world!')

console.log(global?.$hasPer('home'))
console.log(import.meta.env.VITE_ENV)

// 切换主题
const switchDarkTheme = () => {
  appStore.switchTheme('#000')
}
const switchWhiteTheme = () => {
  appStore.theme = '#fff'
}


// hook使用
const { x, y } = useMouse()


// 依赖注入使用
provide(PROVIDE_STRING, 'hello world123')

</script>
<style lang="less" scoped>
  .index {
    width: 100%;
    .index-grid {
      width: 100%;

      :deep(.arco-card-body) {
        min-height: 200px;
      }
    }
  }
</style>