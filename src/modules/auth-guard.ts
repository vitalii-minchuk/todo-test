import { useAuthStore } from '~/stores/auth'
import type { TAppContext } from '~/types/common'

export const install: TAppContext = ({ router }) => {
  router.beforeEach(async (to, _, next) => {
    const { isAuthenticated } = useAuthStore()

    if (to.path !== '/login' && !isAuthenticated)
      next({ name: '/login/' })

    else
      next()
  })
}
