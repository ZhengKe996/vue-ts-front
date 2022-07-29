import { createStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
import { store as Category, CategoryState } from "./modules/category";
import { store as Theme, ThemeState } from "./modules/theme";
import { store as App, AppState } from "./modules/app";
import { store as Search, SearchState } from "./modules/search";

export interface RootState {
  Category: CategoryState;
  Theme: ThemeState;
  App: AppState;
  Search: SearchState;
}
const store: Store<RootState> = createStore({
  getters,
  modules: {
    Category,
    Theme,
    App,
    Search,
  },
  plugins: [
    createPersistedState({
      key: "Zhengke-front",
      paths: ["Category", "Theme", "Search"],
    }),
  ],
});

export default store;
