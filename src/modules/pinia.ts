import { createPinia } from 'pinia'
import type { TAppContext } from '~/types'

// Setup Pinia
// https://pinia.vuejs.org/
export const store = createPinia()
export const install: TAppContext = ({ app }) => {
  app.use(store)
}
