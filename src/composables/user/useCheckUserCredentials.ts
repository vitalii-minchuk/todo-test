import type { IUser } from '~/api/user/types'
import type { ILoginUserInput } from '~/types/login'

export interface ICheckUserCredentialsComposition {
  checkCredentials: ({ userName, phone }: ILoginUserInput) => Promise<IUser | null>
}

export function useCheckUserCredentials(): ICheckUserCredentialsComposition {
  const userStore = useUserStore()

  // function checks users credentials and return ether user data or null
  // if user name and phone are not provided return null
  // wait for loading all the users
  // when something went wrong with user-list return null
  // find user with given credentials
  // return user when found one and null if not
  const checkCredentials = async (
    { userName, phone }: { userName: string, phone: string },
  ): Promise<IUser | null> => {
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
