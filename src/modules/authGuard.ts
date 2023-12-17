import { useAuthStore } from '~/stores/auth'
import type { TAppContext } from '~/types'

export const install: TAppContext = ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const { isAuthenticated } = useAuthStore()

    if (to.path !== '/login' && !isAuthenticated)
      next({ name: '/login/' })

    else
      next()
  })
}
