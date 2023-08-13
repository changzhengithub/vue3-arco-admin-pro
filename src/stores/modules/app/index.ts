import { defineStore } from 'pinia'
import type { AppState } from './types'

export const useAppStore = defineStore('app', {

  state: (): AppState => ({
    theme: '',
    appName: '',
    hideMenu: false,
    userList: []
  }),

  getters: {
    userLength(state): number {
      return state.userList.length
    }
  },

  actions: {
    switchTheme(color: string) {
      this.theme = color
    }
  }
})