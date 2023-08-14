import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/',
  // 本地服务启动配置、跨域配置
  // server: {
  //   host: '',
  //   port: 8080,
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.100.4:3321',
  //       ws: false,
  //       changeOrigin: true
  //     }
  //   }
  // },
  plugins: [
    vue(),
    vueJsx(),
    // 配置vite在运行的时候自动检测eslint规范
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.vue', 'src/*.ts', 'src/*.js', 'src/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      // 配置less全局使用
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/assets/less/main.less')}";`,
        },
        javascriptEnabled: true
      }
    }
  }
})
