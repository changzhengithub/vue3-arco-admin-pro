import { defineStore } from 'pinia'
import type { PublicState, UserInfo } from './types'

export const useAppStore = defineStore('app', {

  state: (): PublicState => ({
    userInfo: {} as UserInfo,
    token: '',
    routerList: []
  }),

  getters: {
    // userLength(state): number {
    //   return state.userList.length
    // }
  },

  actions: {
    // switchTheme(color: string) {
    //   this.theme = color
    // }
  }
})