import type { IUser } from '~/api/user/types'

export function getFormattedUserNameWithID(user: IUser | null) {
  if (!user)
    return ''

  const { id = 'unknown', name = 'unknown', username = 'unknown' } = user

  return `[ID: ${id}]: ${name} ("${username}")`
}
