import { Module } from "vuex";
import { RootState } from "../index";
import { ALL_CATEGORY_ITEM, Category, ROUTER_TYPE_ENUM } from "@/constants";

export interface AppState {
  // 当前选中的分类
  currentCategory: Category;
  // 搜索的文本
  searchText: string;
  // 路由跳转类型
  routerType: "none" | "push" | "back";
}

/**
 * app 的数据
 */
export const store: Module<AppState, RootState> = {
  namespaced: true,
  state: (): AppState => ({
    // 当前选中的分类
    currentCategory: ALL_CATEGORY_ITEM,
    // 搜索的文本
    searchText: "",
    // 路由跳转类型
    routerType: ROUTER_TYPE_ENUM.NONE,
  }),
  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory;
    },
    /**
     * 修改 searchText
     */
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText;
    },
    /**
     * 修改 routerType
     */
    changeRouterType(state, newType) {
      state.routerType = newType;
    },
  },
};
