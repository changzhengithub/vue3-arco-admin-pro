<template>
  <!-- 每个路由只缓存当前的子路由 -->
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="appStore.cacheList">
      <component :is="Component"/>
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
const appStore = useAppStore()
</script>
