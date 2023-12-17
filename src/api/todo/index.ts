import type { ICreateTodoResponse, ITodo, TCreateTodoInput, TUpdateTodoInput } from './types'
import { jsonPlaceholderApi } from '~/utils/http'

enum Api {
  TODOS = '/todos',
}

export function getAllTodos() {
  return jsonPlaceholderApi.get<ITodo[]>(Api.TODOS)
}

export function getTodosByUserId(userId: number) {
  return jsonPlaceholderApi.get<ITodo[]>(Api.TODOS, { params: { userId } })
}

export function createTodo(input: TCreateTodoInput) {
  return jsonPlaceholderApi.post<ICreateTodoResponse>(Api.TODOS, { input })
}

export function updateTodo(input: TUpdateTodoInput) {
  const { completed, id } = input
  return jsonPlaceholderApi.patch<ITodo>(`${Api.TODOS}/${id}`, { completed })
}
