import { acceptHMRUpdate, defineStore } from 'pinia'
import { createTodo, getAllTodos, getTodosByUserId, updateTodo } from '~/api/todo'
import type { ITodo, ITodoWithLikes, TCreateTodoInput, TUpdateTodoInput } from '~/api/todo/types'
import { ESessionStorageKey } from '~/enums/session-storage-key-enum'

export interface ITodoStore {
  allTodos: ITodo[]
  usersTodos: ITodoWithLikes[]
}

export const useTodoStore = defineStore({
  id: 'todo',
  state: (): ITodoStore => ({
    allTodos: [],
    usersTodos: [],
  }),
  getters: {
    getAllTodos(): ITodo[] {
      return this.allTodos
    },
    getUsersTodos(): ITodoWithLikes[] {
      return this.usersTodos
    },
    getCurrentUserId(): number | null {
      const userStore = useUserStore()
      return userStore.getCurrentUser?.id ?? null
    },
  },
  actions: {
    setAllTodos(todos: ITodo[]): void {
      this.allTodos = todos
    },
    setUsersTodos(todos: ITodoWithLikes[]): void {
      this.usersTodos = todos
    },
    addLikesToUsersTodos(todos: ITodo[], userId: number): ITodoWithLikes[] {
      const storedLikesAsString = sessionStorage.getItem(ESessionStorageKey.FAVORITES)
      const storedLikes = storedLikesAsString ? JSON.parse(storedLikesAsString) : {}

      return todos.map((el) => {
        const isFavorite = storedLikes[userId]?.includes(el.id)
        return ({ ...el, isFavorite })
      })
    },
    likeTodo(todoId: number): void {
      if (!this.getCurrentUserId)
        return

      const storedLikesAsString = sessionStorage.getItem(ESessionStorageKey.FAVORITES)
      const storedLikes = storedLikesAsString ? JSON.parse(storedLikesAsString) : {}

      if (this.getCurrentUserId in storedLikes) {
        storedLikes[this.getCurrentUserId].push(todoId)
      }
      else {
        storedLikes[this.getCurrentUserId] = []
        storedLikes[this.getCurrentUserId].push(todoId)
      }

      const updatedLikesAsString = JSON.stringify(storedLikes)
      sessionStorage.setItem(ESessionStorageKey.FAVORITES, updatedLikesAsString)
    },
    dislikeTodo(todoId: number): void {
      if (!this.getCurrentUserId)
        return

      const storedLikesAsString = sessionStorage.getItem(ESessionStorageKey.FAVORITES)
      const storedLikes = storedLikesAsString ? JSON.parse(storedLikesAsString) : {}
      const todoIds = (storedLikes[this.getCurrentUserId] as number[])?.filter(el => el !== todoId)

      if (!todoIds?.length) {
        delete storedLikes[this.getCurrentUserId]

        const updatedLikesAsString = JSON.stringify(storedLikes)
        sessionStorage.setItem(ESessionStorageKey.FAVORITES, updatedLikesAsString)
      }
      else {
        const updatedLikes = {
          ...storedLikes,
          [this.getCurrentUserId]: todoIds,
        }

        const updatedLikesAsString = JSON.stringify(updatedLikes)
        sessionStorage.setItem(ESessionStorageKey.FAVORITES, updatedLikesAsString)
      }
    },
    checkExistingUsersTodos(userId: number): boolean {
      return Boolean(this.getUsersTodos.length && this.getUsersTodos[0].userId === userId)
    },
    async createTodo(input: TCreateTodoInput): Promise<void> {
      await createTodo(input)
    },
    async updateTodo(input: TUpdateTodoInput): Promise<void> {
      await updateTodo(input)
    },
    async loadAllTodos(): Promise<void> {
      const todos = await getAllTodos()

      this.setAllTodos(todos?.data ?? [])
    },
    async loadUsersTodos(userId: number): Promise<void> {
      if (!userId)
        return

      const todos = await getTodosByUserId(userId)

      if (!todos?.data?.length)
        return

      const todosWithLikes = this.addLikesToUsersTodos(todos.data, userId)

      this.setUsersTodos(todosWithLikes)
    },
    resetTodoState(): void {
      this.allTodos = []
      this.usersTodos = []
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
