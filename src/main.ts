
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'
import IconFont from '@/components/Iconfont'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

// CSS引入
import './assets/css/main.css'
// 主题颜色
import '@arco-design/web-vue/dist/arco.css'
// import '@arco-themes/vue-arco-admin-pro/css/arco.css'

import './mock'
import './permission'


// 配置mitt公共组件传参
import mitt from 'mitt'
const emitter = mitt()
// TS注册
// 必须要扩展ComponentCustomProperties类型才能获得类型提示
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof emitter
  }
}

const app = createApp(App)

// 全局注册iconfot组件
app.component('IconFont', IconFont)

app.use(store)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
// 挂载到全局属性上
app.config.globalProperties.$Bus = emitter

app.mount('#app')