import { acceptHMRUpdate, defineStore } from 'pinia'
import { getAllUsers } from '~/api/user'
import type { IUser } from '~/api/user/types'

export interface IUserStore {
  currentUser: IUser | null
  users: IUser[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserStore => ({
    currentUser: null,
    users: [],
  }),
  getters: {
    getAllUsers(): IUser[] {
      return this.users
    },
    getCurrentUser(): IUser | null {
      return this.currentUser
    },
  },
  actions: {
    setUsers(users: IUser[]): void {
      this.users = users
    },
    setCurrentUser(userId: number): void {
      const user = this.getAllUsers.find(el => el.id === userId)
      this.currentUser = user ?? null
    },
    async loadAllUsers(): Promise<void> {
      const users = await getAllUsers()

      this.setUsers(users?.data ?? [])
    },
    async initUserStoreData() {
      await this.loadAllUsers()

      if (this.getAllUsers.length) {
        const firstUser = this.getAllUsers[0]
        this.setCurrentUser(firstUser.id)
      }
    },
    resetUserState(): void {
      this.users = []
      this.currentUser = null
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
