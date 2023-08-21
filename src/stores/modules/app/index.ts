/**
 * @desc APP相关store
 * @author changz
 * */

import { defineStore } from 'pinia'
import type { AppState } from './types'

export const useAppStore = defineStore('app', {

  state: (): AppState => ({
    pageLoad: false,
    theme: '',
    appName: '',
    hideMenu: false,
    cacheList: []
  }),

  getters: {},

  actions: {
    switchTheme(color: string) {
      this.theme = color
    }
  }
})