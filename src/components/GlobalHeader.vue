<template>
  <div class="global-header">
    <div class="header-left">
      <a-button shape="round" @click="toggleCollapse">
        <icon-menu-unfold v-if="collapsed" />
        <icon-menu-fold v-else />
      </a-button>
    </div>
    <HeaderRight></HeaderRight>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import HeaderRight from './HeaderRight.vue'

// 自定义事件
const emit = defineEmits<{
  'COLLAPSE_EVENT': []
}>()

const collapsed = ref(false) // 折叠导航栏

// 折叠展开导航栏
const toggleCollapse = () => {
  collapsed.value = !collapsed.value
  emit('COLLAPSE_EVENT')
}
</script>

<style lang="less" scoped>
.global-header {
  .flex_vertical_center_horizontal_between();
  width: 100%;
  height: 100%;
  padding: 0 24px;

  .header-right {
    display: flex;
    align-items: center;
    height: 100%;

    .right-info {
      height: 100%;
      .flex_vertical_center();

      .info-detail {
        .flex_direction_vertical_center();
        padding-left: 10px;
        text-align: left;
        cursor: pointer;
        .detail-name {
          height: 20px;
          line-height: 20px;
          margin-bottom: 2px;
          font-size: 14px;
          color: #333;
        }
        .detail-unit {
          height: 16px;
          line-height: 16px;
          font-size: 12px;
          color: #999;
          // border: 1px solid #165DFF;
        }
      }
    }
  }
}
</style>
