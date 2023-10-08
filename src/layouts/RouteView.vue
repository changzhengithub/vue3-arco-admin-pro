<template>
  <!-- 每个路由只缓存当前的子路由 -->
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="publicStore.cacheList">
      <component :is="Component"/>
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts" name="RouteView">
/**
 * @desc 子路由模板
 * 用于包含子路由但没有页面的组件上，只用来渲染子组件内容
 * 设置name用来防止在父级路由添加缓存时刷新缓存页
 * 一般多层级菜单缓存失效都是因为RouterView模板是动态的，切换时直接刷新了无法缓存
 * */
import { usePublicStore } from '@/stores/modules/public'
const publicStore = usePublicStore()
</script>
