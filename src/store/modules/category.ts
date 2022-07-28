import { Module } from "vuex";
import { RootState } from "../index";
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from "@/constants";
import { getCategory } from "@/api/category";

export interface CategoryState {
  categorys: any[];
}
/**
 * 处理 navigation 中的数据
 */
export const store: Module<CategoryState, RootState> = {
  namespaced: true,
  state: (): CategoryState => ({
    categorys: CATEGORY_NOMAR_DATA,
  }),
  mutations: {
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys];
    },
  },
  actions: {
    async useCategoryData(context) {
      const { data } = await getCategory();
      context.commit("setCategorys", data);
    },
  },
};
