import { defineStore } from 'pinia'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

export interface ThemeState {
  themeType: typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM
}

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => {
    return { themeType: THEME_LIGHT }
  },
  getters: {
    getThemeType(): typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM {
      return this.themeType
    }
  },
  actions: {
    changeThemeType(newTheme: typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM) {
      this.themeType = newTheme
    }
  }
})
