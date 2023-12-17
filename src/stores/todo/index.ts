import { acceptHMRUpdate, defineStore } from 'pinia'
import { createTodo, getAllTodos, getTodosByUserId, updateTodo } from '~/api/todo'
import type { ITodo, TCreateTodoInput, TUpdateTodoInput } from '~/api/todo/types'

export interface ITodoStore {
  allTodos: ITodo[]
  usersTodos: ITodo[]
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
    getUsersTodos(): ITodo[] {
      return this.usersTodos
    },
  },
  actions: {
    setAllTodos(todos: ITodo[]): void {
      this.allTodos = todos
    },
    setUsersTodos(todos: ITodo[]): void {
      this.usersTodos = todos
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

      this.setUsersTodos(todos?.data ?? [])
    },
    resetTodoState(): void {
      this.allTodos = []
      this.usersTodos = []
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
