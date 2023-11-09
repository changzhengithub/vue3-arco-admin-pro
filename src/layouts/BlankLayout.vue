<template>
  <div class="blank">
    <div class="blank-header">
      <GlobalHeader></GlobalHeader>
    </div>
    <div class="blank-container">
      <!-- 路由缓存，只针对当前子路由进行缓存 -->
      <!-- RouteView 子路由模板名称，防止刷新子路由 -->
      <RouterView v-slot="{ Component }">
        <!-- <Transition name="fade" mode="out-in" appear> -->
          <KeepAlive :include="['RouteView', ...publicStore.cacheList]">
            <component :is="Component"></component>
          </KeepAlive>
        <!-- </Transition> -->
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts" name="BlankLayout">
/**
 * @description 空白布局
 * @author changz
 * */
import { usePublicStore } from '@/stores/modules/public'

import GlobalHeader from '@/components/GlobalHeader.vue'

const publicStore = usePublicStore()
</script>
<style lang="less" scoped>
.blank {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .blank-header {
    width: 100%;
    height: 48px;
  }
  .blank-container {
    display: flex;
    width: 100%;
    background-color: #fff;
    height: calc(100vh - 48px);
    overflow: auto;
  }
}
</style>