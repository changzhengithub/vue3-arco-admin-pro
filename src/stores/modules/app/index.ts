/**
 * @desc APP相关store
 * @author changz
 * */

import { defineStore } from 'pinia'
import type { AppState } from './types'

import settings from '@/config/settings'

export const useAppStore = defineStore('app', {

  state: (): AppState => ({ ...settings }),

  getters: {},

  actions: {
    switchTheme(color: string) {
      this.theme = color
    }
  }
})