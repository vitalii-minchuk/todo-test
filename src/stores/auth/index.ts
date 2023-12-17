import { acceptHMRUpdate, defineStore } from 'pinia'

export interface IAuthStore {
  isAuthenticated: boolean
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IAuthStore => ({
    isAuthenticated: false,
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
    login(): void {
      this.setIsAuthenticated(true)
    },
    logout(): void {
      this.setIsAuthenticated(false)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
