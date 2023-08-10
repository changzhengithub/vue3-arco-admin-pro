
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'
import ArcoVue from '@arco-design/web-vue'

// CSS引入
import './assets/css/main.css'
import '@arco-design/web-vue/dist/arco.css'


const app = createApp(App)

app.use(store)
app.use(router)
app.use(ArcoVue)

app.mount('#app')
