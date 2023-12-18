import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import type { TAppContext } from '~/types/common'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const isDark = useDark()

// configure vuetify (more on https://vuetifyjs.com/)
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
    defaults: {
      VBtn: {
        style: 'text-transform: none;',
      },
    },
  })

  app.use(vuetify)
}
