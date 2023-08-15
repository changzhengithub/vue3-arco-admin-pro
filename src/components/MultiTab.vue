<template>
  <div class="tab">
    <a-tabs v-model:active-key="activeKey" type="card-gutter" :editable="true" auto-switch @tab-click="gotoPage" @delete="deleteRoute" >
      <a-tab-pane v-for="page in pages" :key="page.path" :title="page.meta.title" :closable="pages.length > 1" ></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
/**
 * 简易多标签页
 * @desc 头部多标签页展示
 * @author jcc
 * @example 调用示例
 * <MultiTab></MultiTab>
 * */

import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'MultiTab',
  data() {
    return {
      fullPathList: [],
      menuList: [],
      pages: [],
      activeKey: '', // 被选中tab
      learnQuery: '', // 学习视频的参数

      cacheList: [] // 缓存数据
    }
  },
  computed: {
    ...mapState(['routerList'])
  },
  watch: {
    '$route'(route) {
      this.activeKey = route.path
      if (this.fullPathList.indexOf(route.path) < 0) {
        if (route.path !== '/train/learning-vedio') {
          this.fullPathList.push(route.path)
          this.pages.push(route)
          this.setTabsCache(this.pages)
        }
      }
    },
  },
  created() {
    const menuList = this.getMeunList(this.routerList)
    this.menuList = menuList[0].children
    this.getRoute()
  },
  methods: {
    // ...mapMutations(['setRouterList']),
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

    getRoute() {
      const route = this.$route
      this.activeKey = route.path
      if (this.fullPathList.indexOf(route.path) < 0) {
        if (route.path !== '/train/learning-vedio') {
          this.fullPathList.push(route.path)
          this.pages.push(route)
          this.setTabsCache(this.pages)
        }
      }
    },

    gotoPage() {
      this.$router.push({ path: this.activeKey })
      this.setTabsCache(this.pages)
    },
  
    // 删除
    deleteRoute(key) {
      this.pages = this.pages.filter(page => page.path !== key)
      this.fullPathList = this.fullPathList.filter(path => path !== key)
      this.setTabsCache(this.pages)
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath()
      }
    },
    selectedLastPath () {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1]
      this.$router.push({ path: this.activeKey })
    },

    // tabs中存在的页面设置缓存
    setTabsCache(pages) {
      this.cacheList = pages.map(item => item.name)
      this.$store.commit('setCacheList', this.cacheList)
    }
  }
})
</script>
<style lang="less" scoped>
.tab {
  width: 100%;
  padding: 8px 20px;
  background-color: #ffffff;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f1f1f1;
}

// 去除tab默认样式
:deep(.arco-tabs-nav::before) {
  display: none;
}
:deep(.arco-tabs-content) {
  display: none;
}
:deep(.arco-tabs-tab-active) {
  border-bottom: 1px solid var(--color-neutral-3);
}

:deep(.arco-tabs-nav-type-card-gutter) {
  .arco-tabs-tab-active {
    border-bottom: 1px solid var(--color-neutral-3);
  }
  .arco-tabs-tab-active:hover {
    border-bottom: 1px solid var(--color-neutral-3);
  }
}
</style>