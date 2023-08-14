<template>
  <div class="blank">
    <div class="blank-header">
      <GlobalHeader></GlobalHeader>
    </div>
    <div class="blank-container">
      <!-- 是否缓存父组件层级 -->
      <keep-alive>
        <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view :key="$route.fullPath" v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
/**
 * @description 空白布局
 * */

import GlobalHeader from '@/components/GlobalHeader'

export default {
  components: {
    GlobalHeader
  },

  data() {
    return {}
  },

  created() {},
  methods: {}
}
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