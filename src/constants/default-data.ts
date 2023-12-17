import type { TCreateTodoInput } from '~/api/todo/types'
import type { ILoginUserInput } from '~/types/login'

export const DEFAULT_LOGIN_USER_INPUT: ILoginUserInput = {
  userName: '',
  phone: '',
}

export const DEFAULT_CREATE_TODO_INPUT: TCreateTodoInput = {
  completed: false,
  userId: null,
  title: '',
}
