import { useTheme as useThemeVuetify } from 'vuetify'
import type { Ref } from 'vue'

export interface IThemeComposition {
  isDark: Ref<boolean>
  toggleTheme: () => void
}

export function useTheme(): IThemeComposition {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  const theme = useThemeVuetify()

  // change apps theme - taken from vueuse docs
  const toggleTheme = () => {
    toggleDark()
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
  return {
    isDark,
    toggleTheme,
  }
}
