import type { IUser } from '~/api/user/types'

// formate string to "[ID 5]: John Dow ('Nickname')"
export function getFormattedUserNameWithID(user: IUser | null) {
  if (!user)
    return ''

  const { id = 'unknown', name = 'unknown', username = 'unknown' } = user

  return `[ID: ${id}]: ${name} ("${username}")`
}
