import { createStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
import { store as Category, CategoryState } from "./modules/category";
import { store as Theme, ThemeState } from "./modules/theme";
import { store as App, AppState } from "./modules/app";
import { store as Search, SearchState } from "./modules/search";
import { store as User, UserState } from "./modules/user";

export interface RootState {
  Category: CategoryState;
  Theme: ThemeState;
  App: AppState;
  Search: SearchState;
  User: UserState;
}
const store: Store<RootState> = createStore({
  getters,
  modules: {
    Category,
    Theme,
    App,
    Search,
    User,
  },
  plugins: [
    createPersistedState({
      key: "Zhengke-front",
      paths: ["Category", "Theme", "Search", "User"],
    }),
  ],
});

export default store;
