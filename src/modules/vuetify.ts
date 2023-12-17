import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import type { TAppContext } from '~/types'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const isDark = useDark()

export const install: TAppContext = ({ app }) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: isDark.value ? 'dark' : 'light',
    },
  })

  app.use(vuetify)
}
