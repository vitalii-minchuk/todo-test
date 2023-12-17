import { acceptHMRUpdate, defineStore } from 'pinia'

export interface IAuth {
  isAuthenticated: boolean
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IAuth => ({
    isAuthenticated: true,
  }),
  getters: {
    getIsAuthenticated(): boolean {
      return this.isAuthenticated
    },
  },
  actions: {
    setIsAuthenticated(value: boolean): void {
      this.isAuthenticated = value
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
