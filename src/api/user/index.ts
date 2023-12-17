import type { IUser } from './types'
import { jsonPlaceholderApi } from '~/utils/http'

enum Api {
  USERS = '/users',
}

export function getAllUsers() {
  return jsonPlaceholderApi.get<IUser[]>(Api.USERS)
}

export function getUserById(userId: number) {
  return jsonPlaceholderApi.get<IUser>(`${Api.USERS}/${userId}`)
}
