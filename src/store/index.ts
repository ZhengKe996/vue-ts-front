import { createStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
import { store as Category, CategoryState } from "./modules/category";
import { store as Theme, ThemeState } from "./modules/theme";

export interface RootState {
  Category: CategoryState;
  Theme: ThemeState;
}
const store: Store<RootState> = createStore({
  getters,
  modules: {
    Category,
    Theme,
  },
  plugins: [
    createPersistedState({
      key: "Zhengke-front",
      paths: ["Category"],
    }),
  ],
});

export default store;
