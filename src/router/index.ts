import { createRouter, createWebHistory } from 'vue-router'

// import { constantRouterMap } from '@/router/router.config'
import { constantRouterMap, asyncRouterMap } from '@/router/router.config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes: constantRouterMap
  routes: constantRouterMap.concat(asyncRouterMap)
})

export default router
