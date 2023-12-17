export interface ITodo {
  userId: number | null
  id: number
  title: string
  completed: boolean
}

export interface ITodoWithLikes extends ITodo {
  isFavorite: boolean
}

export type TCreateTodoInput = Omit<ITodo, 'id'>

export type TUpdateTodoInput = Pick<ITodo, 'id' | 'completed'>

export interface ICreateTodoResponse {
  input: TCreateTodoInput
  id: number
}
