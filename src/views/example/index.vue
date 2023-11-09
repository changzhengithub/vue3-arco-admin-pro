<template>
  <div class="index">
    <a-tabs>
      <a-tab-pane key="1" title="轮播图">
        <SwiperExample></SwiperExample>
      </a-tab-pane>
      <a-tab-pane key="2" title="富文本">
        <WangEditor></WangEditor>
      </a-tab-pane>
      <a-tab-pane key="3">
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

import SwiperExample from './components/SwiperExample.vue'
import WangEditor from './components/WangEditor.vue'
// import useGlobalProperties from '@/hooks/globalProperties'
// const { global } = useGlobalProperties()

</script>

<style lang="less" scoped>
  .index {
    width: 100%;
    padding: 20px;
    background-color: #fff;
  }
</style>