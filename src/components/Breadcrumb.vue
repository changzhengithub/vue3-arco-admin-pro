<template>
  <a-breadcrumb class="container-breadcrumb">
    <template v-for="(item, index) in routeList" :key="index">
      <a-breadcrumb-item v-if="index === 0">
        <icon-apps />
        <component :is="item?.meta?.icon"></component>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-else>
        {{ item?.meta?.title }}
        <!-- <a-link :href="item.path"> {{item?.meta?.title}} </a-link> -->
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
/**
 * @desc 面包屑
 * 根据路由自动生成面包屑
 * @author changz
 * @example 调用示例
 * import Breadcrumb from '@/components/Breadcrumb'
 * <Breadcrumb></Breadcrumb>
 * */
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate, type RouteRecord } from 'vue-router'

const route = useRoute()

const routeList = ref<RouteRecord[]>([])

onMounted(() => {
  routeList.value = route.matched
})

// 监听当前路由更改
onBeforeRouteUpdate((to, from, next) => {
  routeList.value = to.matched
  next()
})

</script>

<style scoped lang="less">
.container-breadcrumb {
  padding: 10px 20px;
  background-color: #f2f2f2;
  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));

    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
</style>
