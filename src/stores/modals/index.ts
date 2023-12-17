import { acceptHMRUpdate, defineStore } from 'pinia'

export interface IModalsStore {
  test: boolean
}

export const useModalsStore = defineStore({
  id: 'modals',
  state: (): IModalsStore => ({
    test: false,
  }),
  getters: {
    getTest(this): boolean {
      return this.test
    },
  },
  actions: {
    openModal(modal: keyof IModalsStore): void {
      this[modal] = true
    },
    closeModal(modal: keyof IModalsStore): void {
      this[modal] = false
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useModalsStore, import.meta.hot))
