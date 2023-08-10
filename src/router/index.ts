import { createRouter, createWebHistory } from 'vue-router'


const HomeComponent = () => import(/* webpackChunkName: 'home' */ '../views/home/index.vue')
const MineComponent = () => import(/* webpackChunkName: 'mine' */ '../views/mine/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeComponent,
      meta: { title: '主页', icon: 'favorites', keepAlive: false, isAuth: true, permission: 'home' }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: MineComponent
    }
  ]
})

export default router
