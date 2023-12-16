import { acceptHMRUpdate, defineStore } from 'pinia'

export interface IModals {
  test: boolean
}

export const useModalsStore = defineStore({
  id: 'modals',
  state: (): IModals => ({
    test: false,
  }),
  getters: {
    getTest(): boolean {
      return this.test
    },
  },
  actions: {
    openModal(modal: keyof IModals): void {
      this[modal] = true
    },
    closeModal(modal: keyof IModals): void {
      this[modal] = false
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useModalsStore, import.meta.hot))
