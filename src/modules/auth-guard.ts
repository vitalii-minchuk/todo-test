import { useAuthStore } from '~/stores/auth'
import type { TAppContext } from '~/types/common'

// check if user is auth
// redirect user to login page without auth
// redirect to root page if user tries to reach login page being auth
// if everything ok just let user go to chosen page
export const install: TAppContext = ({ router }) => {
  router.beforeEach(async (to, _, next) => {
    const { isAuthenticated } = useAuthStore()

    if (to.path !== '/login' && !isAuthenticated)
      next({ name: '/login/' })

    else if (to.path === '/login' && isAuthenticated)
      next({ name: '/' })

    else
      next()
  })
}
