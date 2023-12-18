import { acceptHMRUpdate, defineStore } from 'pinia'

// list of modals
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
  // open and close modals using key
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
