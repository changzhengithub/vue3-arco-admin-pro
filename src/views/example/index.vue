<template>
  <div class="index">
    <a-tabs v-model:active-key="activeTabKey">
      <a-tab-pane :key="1" title="轮播图">
        <SwiperExample v-if="activeTabKey == 1"></SwiperExample>
      </a-tab-pane>
      <a-tab-pane :key="2" title="富文本">
        <WangEditor v-if="activeTabKey == 2"></WangEditor>
      </a-tab-pane>
      <a-tab-pane :key="3">
        <template #title>Tab 3</template>
        Content of Tab Panel 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<!-- If you want the include property of keep-alive to take effect, you must name the component -->
<script setup lang="ts" name="Example">
/**
 * @desc 示例
 * @author changz
 * */
import { ref } from 'vue'
import SwiperExample from './components/SwiperExample.vue'
import WangEditor from './components/WangEditor.vue'
// import useGlobalProperties from '@/hooks/globalProperties'
// const { global } = useGlobalProperties()

const activeTabKey = ref(1)
</script>

<style lang="less" scoped>
  .index {
    width: 100%;
    padding: 20px;
    background-color: #fff;
  }
</style>