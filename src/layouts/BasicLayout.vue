<template>
  <a-spin dot :loading="pageLoad" :style="{ width: '100%' }" tip="加载中...">
    <a-layout class="basic">
      <!-- 侧边导航栏 start -->
      <a-layout-sider hide-trigger :width="220" collapsible :collapsed="collapsed">
        <div class="logo" @click="backHome">
          <img src="@/assets/images/logo.png" alt="" />
          <div class="logo-title">三实综合管理平台</div>
        </div>
        <a-menu :selected-keys="selectedKeys" :open-keys="openKeys" :auto-scroll-into-view="true" :auto-open="true" :accordion="true" @sub-menu-click="subMenuClick" @menuItemClick="onClickMenuItem">
          <template v-for="(item, index) in menuList" :key="index">
            <a-menu-item :key="item.path" v-if="!item.children">
              <arcoIcon :icon="item.meta.icon"></arcoIcon>
              <span>{{ item.meta.title }}</span>
            </a-menu-item>
            <a-sub-menu v-if="item.children && item.children.length" :key="item.path">
              <template #title>
                <span><arcoIcon :icon="item.meta.icon"></arcoIcon>
                  <a-badge dot v-if="item.path == '/invoice' && need_open" :count="9">
                    {{ item.meta.title }}
                  </a-badge>
                  <span v-else>{{ item.meta.title }}</span>
                </span>
              </template>
              <a-menu-item v-for="subItem in item.children" :key="subItem.path">
                <arcoIcon :icon="subItem.meta.icon"></arcoIcon>
                <a-badge dot v-if="subItem.path == '/invoice/project-invoice' && need_open" :count="9">
                  {{ subItem.meta.title }}
                </a-badge>
                <span v-else>{{ subItem.meta.title }}</span>
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
            <router-view v-slot="{ Component, route }">
              <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
              <!-- 缓存第一层 -->
              <keep-alive v-else>
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </router-view>
            <!-- <keep-alive :include="cacheList">
              <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view :key="$route.fullPath " v-if="!$route.meta.keepAlive"></router-view> -->
          </div>
          <!-- <a-layout-footer>Footer</a-layout-footer> -->
        </a-layout>
      </a-layout>
    </a-layout>
  </a-spin>

</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

import { arcoIcon } from '@/utils/render'
import GlobalHeader from '@/components/GlobalHeader'

import { regulationListApi } from '@/api/regime'
import { judgeNeedOpenInvoiceApi } from '@/api/public'

import MultiTab from '@/components/MultiTab'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    arcoIcon,
    GlobalHeader,
    MultiTab
  },

  data() {
    return {
      collapsed: false, // 折叠导航栏
      menuList: [],
      currentRoute: '',
      selectedKeys: [],
      openKeys: [],
      need_open: false,

      readRegimeDialog: {
        visible: false
      },
      regimeList: [],
      regimeIndex: 0,
      regimeDetail: {},
      relateNumData: {},
      pageListLoading: false,
      readTimer: null
    }
  },
  computed: {
    ...mapState(['routerList']),
    ...mapState({
      pageLoad: state => state.publicVuex.pageLoad
    })
  },

  beforeRouteUpdate(to, from, next) {
    this.getOpenKeys(to.path)
    this.selectedKeys = [to.path]
    next()
  },

  created() {
    const menuList = this.getMeunList(this.routerList)
    this.menuList = menuList[0].children
    this.getOpenKeys(this.$route.path)
    this.selectedKeys = [this.$route.path]
    this.getRegimeList()

    this.getJudgeNeedOpenInvoice()
  },
  methods: {
    // 获取路由列表
    getMeunList(routerList) {
      const menuList = routerList.filter(item => {
        if (!item.hidden) {
          if (item.children && item.children.length) {
            item.children = this.getMeunList(item.children)
          }
          return true
        }
        return false
      })
      return menuList
    },

    // 折叠展开导航栏
    onCollapse() {
      this.collapsed = !this.collapsed
    },

    // 展开子菜单
    subMenuClick(key, openKeys) {
      this.openKeys = openKeys
    },

    // 点击logo返回主页
    backHome() {
      let path  = ''
      const menuFirstItem = this.menuList[0]
      if (menuFirstItem.children && menuFirstItem.children.length) {
        path = menuFirstItem.children[0].path
        this.openKeys = menuFirstItem.path
      } else {
        path = menuFirstItem.path
      }
      this.$router.push({
        path: path
      })
    },

    // 路由跳转
    onClickMenuItem(key) {
      this.selectedKeys = [key]
      this.$router.push({
        path: key
      })
    },

    // 修改缓存状态
    changeTargetCache(menuList, key) {
      menuList.forEach(item => {
        if (item.path === key) {
          item.meta.keepAlive = false
        } else {
          if (item.children && item.children.length) {
            this.changeTargetCache(item.children, key)
          }
        }
      })
    },

    // 路由跳转获取展开key
    getOpenKeys(path) {
      this.menuList.forEach(item => {
        if (item.children && item.children.length) {
          const bool = item.children.map(sub => sub.path).includes(path)
          if (bool) this.openKeys = [item.path]
        }
      })
    },

    // 获取规章制度列表
    getRegimeList() {
      const params = {
        no_page: 1,
        get_my_unread: 1
      }
      this.pageListLoading = true
      regulationListApi(params)
        .then(res => {
          this.pageListLoading = false
          if (res.code != 200) {
            global.$notification.error({
              title: '错误',
              content: res.msg
            })
            return false
          }
          const data = res.data
          this.regimeList = data
          this.forceReadRegimes()
        })
        .catch(err => {
          this.pageListLoading = false
          global.$notification.error({
            title: '错误',
            content: err.message
          })
        })
    },

    // 获取规章制度列表
    getJudgeNeedOpenInvoice() {
      this.pageListLoading = true
      judgeNeedOpenInvoiceApi()
        .then(res => {
          this.pageListLoading = false
          if (res.code != 200) {
            global.$notification.error({
              title: '错误',
              content: res.msg
            })
            return false
          }
          this.need_open = res.data.need_open

          // const data = res.data
          // this.regimeList = data
          // this.forceReadRegimes()
        })
        .catch(err => {
          this.pageListLoading = false
          global.$notification.error({
            title: '错误',
            content: err.message
          })
        })
    },

    // 强制阅读规章制度
    forceReadRegimes() {
      clearTimeout(this.readTimer)
      if (this.regimeList.length && this.regimeIndex < this.regimeList.length) {
        this.regimeDetail = this.regimeList[this.regimeIndex]
        this.relateNumData = {
          readed: this.regimeIndex + 1,
          allNum: this.regimeList.length
        }
        this.readRegimeDialog.visible = true
      }
      if (this.regimeList.length && this.regimeIndex === this.regimeList.length) {
        location.reload()
      }
    },

    // 关闭规章制度
    closeReadRegimeDialog(flag) {
      this.readRegimeDialog.visible = false
      this.regimeDetail = {}
      if (flag) {
        this.readTimer = setTimeout(() => {
          this.regimeIndex = this.regimeIndex + 1
          this.forceReadRegimes()
        }, 200)
      }
    }
  },
  beforeUnmount() {
    clearTimeout(this.readTimer)
  }
})
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