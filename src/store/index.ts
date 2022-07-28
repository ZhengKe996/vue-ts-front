import { createStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
import { store as Category, CategoryState } from "./modules/category";

export interface RootState {
  Category: CategoryState;
}
const store: Store<RootState> = createStore({
  getters,
  modules: {
    Category,
  },
  plugins: [
    createPersistedState({
      key: "Zhengke-front",
      paths: ["Category"],
    }),
  ],
});

export default store;
