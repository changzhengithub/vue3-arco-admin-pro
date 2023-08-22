<template>
  <a-spin dot :loading="appStore.pageLoad" :style="{ width: '100%' }" tip="加载中...">
    <a-layout class="basic">
      <!-- 侧边导航栏 start -->
      <a-layout-sider hide-trigger :width="220" collapsible :collapsed="collapsed">
        <div class="logo" @click="backHome">
          <img src="@/assets/images/logo.png" alt="" />
          <div class="logo-title">三实综合管理平台</div>
        </div>
        <a-menu :selected-keys="state.selectedKeys" :open-keys="state.openKeys" :auto-scroll-into-view="true" :auto-open="true" :accordion="true" @sub-menu-click="subMenuClick" @menuItemClick="onClickMenuItem">
          <template v-for="(item, index) in state.menuList" :key="index">
            <a-menu-item :key="item.path" v-if="!item.children">
              <template #icon>
                <ArcoIcon :icon="(item?.meta?.icon as string)"></ArcoIcon>
              </template>
              <span>{{ item?.meta?.title }}</span>
            </a-menu-item>
            <a-sub-menu v-if="item.children && item.children.length" :key="item.path">
              <template #icon>
                <ArcoIcon :icon="(item?.meta?.icon as string)"></ArcoIcon>
              </template>
              <template #title>
                <span>{{ item?.meta?.title }}</span>
              </template>
              <a-menu-item v-for="subItem in item.children" :key="subItem.path">
                <template #icon>
                  <ArcoIcon :icon="(subItem?.meta?.icon as string)"></ArcoIcon>
                </template>
                <span>{{ subItem?.meta?.title }}</span>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-menu>
      </a-layout-sider>
      <!-- 侧边导航栏 end -->
      <a-layout>
        <!-- 头部 start -->
        <a-layout-header>
          <GlobalHeader @COLLAPSE_EVENT="onCollapse"></GlobalHeader>
        </a-layout-header>
        <!-- 头部 end -->

        <a-layout class="basic-layout">
          <MultiTab></MultiTab>
          <div class="layout-content">
            <!-- 路由缓存，只针对当前子路由进行缓存 -->
            <!-- RouteView 子路由模板名称，防止刷新子路由 -->
            <RouterView v-slot="{ Component }">
              <KeepAlive :include="['RouteView', ...appStore.cacheList]">
                <component :is="Component"/>
              </KeepAlive>
            </RouterView>
          </div>
          <!-- <a-layout-footer>Footer</a-layout-footer> -->
        </a-layout>
      </a-layout>
    </a-layout>
  </a-spin>
</template>

<script setup lang="ts" name="BasicLayout">
/**
 * @description 侧栏菜单布局
 * */

import { ref, reactive } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate, type RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import { useEmpowerStore } from '@/stores/modules/empower'

import GlobalHeader from '@/components/GlobalHeader.vue'
import MultiTab from '@/components/MultiTab.vue'
import ArcoIcon from '@/components/ArcoIcon'

const appStore = useAppStore()
const empowerStore = useEmpowerStore()
const router = useRouter()
const route = useRoute()

const collapsed = ref(false) // 折叠导航栏

interface State {
  openKeys: string[],
  menuList: RouteRecordRaw[],
  selectedKeys: string[]
}
const state = reactive<State>({
  openKeys: [],
  menuList: [],
  selectedKeys: []
})

// 获取路由列表
const getMeunList = (routerList: RouteRecordRaw[] = []) => {
  const menuList = routerList.filter(item => {
    if (!item?.meta?.hidden) {
      if (item.children && item.children.length) {
        item.children = getMeunList(item.children)
      }
      return true
    }
    return false
  })
  return menuList
}

const routerList = getMeunList(empowerStore.routerList[0].children)
state.menuList = routerList
state.selectedKeys = [route.path]

// 路由跳转获取展开key
const getOpenKeys = (path: string) => {
  state.menuList.forEach(item => {
    if (item.children && item.children.length) {
      const bool = item.children.map(sub => sub.path).includes(path)
      if (bool) state.openKeys = [item.path]
    }
  })
}

getOpenKeys(route.path)

// 监听当前路由更改
onBeforeRouteUpdate((to, from, next) => {
  getOpenKeys(to.path)
  state.selectedKeys = [to.path]
  next()
})


// 折叠展开导航栏
const onCollapse = () => {
  collapsed.value = !collapsed.value
}

// 展开子菜单
const subMenuClick = (key: string, openKeys: string[]) => {
  state.openKeys = openKeys
}

// 路由跳转
const onClickMenuItem = (key: string) => {
  state.selectedKeys = [key]
  router.push({
    path: key
  })
}

// 点击logo返回主页
const backHome = () => {
  router.push({
    path: '/'
  })
}
</script>

<style lang="less" scoped>
.basic {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  :deep(.arco-layout-sider) {
    height: 100%;
    overflow-y: auto;
    .logo {
      display: flex;
      align-items: center;
      width: 100%;
      height: 64px;
      padding: 0 10px;
      overflow: hidden;
      box-shadow: 1px 1px 1px #ccc;
      transition: all 0.3s;
      cursor: pointer;
      img {
        width: 30px;
        height: 30px;
      }
      .logo-title {
        font-size: 16px;
        font-weight: 600;
        margin-left: 10px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  :deep(.arco-layout-header) {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
  }

  .basic-layout {
    width: 100%;
    overflow: hidden;
    .layout-content {
      width: 100%;
      height: 100%;
      padding: 20px 20px;
      font-size: 14px;
      background-color: #f2f2f2;
      overflow-y: auto;
    }
  }
}
:deep(.arco-badge-dot) {
  right: -5px;
  // right: -10px;
  // top: -1px;
}
</style>