import { acceptHMRUpdate, defineStore } from 'pinia'

export interface IModalsStore {
  createTodoModal: boolean
}

export const useModalsStore = defineStore({
  id: 'modals',
  state: (): IModalsStore => ({
    createTodoModal: false,
  }),
  getters: {
    getCreateTodoModal(): boolean {
      return this.createTodoModal
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
