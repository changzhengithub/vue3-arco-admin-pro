import { defineStore } from 'pinia'
import type { PublicState, UserInfo } from './types'

export const usePublicStore = defineStore('public', {

  state: (): PublicState => ({
    pageLoad: false,
    cacheList: [],
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