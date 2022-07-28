import { Module } from "vuex";
import { RootState } from "../index";
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from "@/constants";

export interface ThemeState {
  themeType: typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM;
}
/**
 * 处理 主题
 */
export const store: Module<ThemeState, RootState> = {
  namespaced: true,
  state: (): ThemeState => ({
    themeType: THEME_LIGHT,
  }),
  mutations: {
    changeThemeType(state, newTheme) {
      state.themeType = newTheme;
    },
  },
};
