import { RootState } from "./index";
import { Category } from "@/constants";
export default {
  /**
   * navigationBar 数据源
   */
  categorys: (state: RootState) => state.Category.categorys,
  /**
   * 当前主题
   */
  themeType: (state: RootState) => state.Theme.themeType,
  /**
   * category选中项
   */
  currentCategory: (state: RootState) => state.App.currentCategory,
  /**
   * category选中项下标
   */
  currentCategoryIndex: (state: RootState, getters: any) => {
    return getters.categorys.findIndex((item: Category) => {
      return item.id === getters.currentCategory.id;
    });
  },
  /**
   * 搜索记录
   */
  historys: (state: RootState) => state.Search.historys,
  /**
   * 搜索文本
   */
  searchText: (state: RootState) => state.App.searchText,
};
