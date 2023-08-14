<template>
  <!-- 每个路由只缓存当前的子路由 -->
  <router-view v-slot="{ Component, route }">
    <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
    <keep-alive v-else>
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>
