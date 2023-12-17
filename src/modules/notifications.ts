import Notifications from '@kyvg/vue3-notification'
import type { TAppContext } from '~/types'

export const install: TAppContext = ({ app }) => {
  app.use(Notifications)
}
