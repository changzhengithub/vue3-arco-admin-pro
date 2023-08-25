<template>
  <div class="tab">
    <a-tabs v-model:active-key="activeKey" type="card-gutter" :editable="true" @tab-click="selectRoute" @delete="deleteRoute" >
      <a-tab-pane v-for="page in state.pageList" :key="page.path" :title="(page?.meta?.title as string)" :closable="state.pageList.length > 1"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
/**
 * 简易多标签页
 * @desc 头部多标签页展示
 * 默认在路由中开启keepAlive属性就会缓存组件，为了不让页面一直被缓存，重新打开后还是被缓存，
 * 通过cacheList配合include属性控制让其再关闭标签页后就不在缓存，重新打开可以刷新
 * @author changz
 * @example 调用示例
 * <MultiTab></MultiTab>
 * */

import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate, type RouteLocationNormalizedLoaded } from 'vue-router'
import { usePublicStore } from '@/stores/modules/public'

const publicStore = usePublicStore()
const router = useRouter()
const route = useRoute()

const activeKey = ref('') // 被选中tab

interface State {
  pageList: RouteLocationNormalizedLoaded[]
}
const state = reactive<State>({
  pageList: []
})

onMounted(() => {
  const deepRoute = Object.assign({}, route)
  getCurrentTabByRoute(deepRoute)
})

// 监听当前路由更改
onBeforeRouteUpdate((to, from, next) => {
  getCurrentTabByRoute(to)
  next()
})

// 获取当前Tab
const getCurrentTabByRoute = (route: RouteLocationNormalizedLoaded) => {
  activeKey.value = route.path
  const pathList = state.pageList.map(item => item.path)
  if (!pathList.includes(route.path)) {
    state.pageList.push(route)
    setTabsCache()
  }
}

// 删除Tab
const deleteRoute = (key: string | number) => {
  state.pageList = state.pageList.filter(page => page.path !== key)
  setTabsCache()
  // 删除当前页时自动跳转到最后一个
  if (activeKey.value === key) {
    const pathList = state.pageList.map(item => item.path)
    activeKey.value = pathList[pathList.length - 1]
    selectRoute()
  }
}

// 设置缓存
const setTabsCache = () => {
  const cacheList = state.pageList.filter(item => item.meta.keepAlive).map(item => item.name)
  publicStore.cacheList = cacheList as string[]
}

const selectRoute = () => {
  router.push({ path: activeKey.value })
}
</script>
<style lang="less" scoped>
.tab {
  width: 100%;
  padding: 8px 16px;
  background-color: #ffffff;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f1f1f1;
}

// 去除tab默认样式
:deep(.arco-tabs-nav::before) {
  display: none;
}
:deep(.arco-tabs-content) {
  display: none;
}
:deep(.arco-tabs-tab-active) {
  border-bottom: 1px solid var(--color-neutral-3);
}

:deep(.arco-tabs-nav-type-card-gutter) {
  .arco-tabs-tab-active {
    border-bottom: 1px solid var(--color-neutral-3);
  }
  .arco-tabs-tab-active:hover {
    border-bottom: 1px solid var(--color-neutral-3);
  }
}
</style>