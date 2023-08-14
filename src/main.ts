
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'
import ArcoVue from '@arco-design/web-vue'

// CSS引入
import './assets/css/main.css'
import '@arco-design/web-vue/dist/arco.css'

import './mock'

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

app.use(store)
app.use(router)
app.use(ArcoVue)
// 挂载到全局属性上
app.config.globalProperties.$Bus = emitter

app.mount('#app')