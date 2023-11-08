import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'
import directive from './directive'
import IconFont from '@/components/Iconfont'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import hasPer from '@/utils/permissions'
import emitter from '@/mitt'

// CSS引入
import './assets/css/main.css'
// 主题颜色
import '@arco-design/web-vue/dist/arco.css'
// import '@arco-themes/vue-arco-admin-pro/css/arco.css'

import './mock'
import './permission'


// TS注册
// 必须要扩展ComponentCustomProperties类型才能获得类型提示
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof emitter
    $hasPer: typeof hasPer
  }
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(directive)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(IconFont)

// 挂载到全局属性上
app.config.globalProperties.$Bus = emitter
app.config.globalProperties.$hasPer = hasPer

app.mount('#app')