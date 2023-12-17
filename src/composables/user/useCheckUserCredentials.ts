import type { IUser } from '~/api/user/types'

export interface ICheckUserCredentialsComposition {
  checkCredentials: ({ userName, phone }: { userName: string, phone: string }) => Promise<IUser | null>
}

export function useCheckUserCredentials(): ICheckUserCredentialsComposition {
  const userStore = useUserStore()
  const checkCredentials = async ({ userName, phone }: { userName: string, phone: string }): Promise<IUser | null> => {
    if (!userName || !phone)
      return null

    await userStore.loadAllUsers()

    const users = userStore.getAllUsers

    if (!users)
      return null

    const user = users.find(el => el.phone === phone && el.username === userName)

    if (!user)
      return null

    return user
  }
  return { checkCredentials }
}
