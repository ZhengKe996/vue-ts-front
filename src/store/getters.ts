import { RootState } from "./index";

export default {
  categorys: (state: RootState) => state.Category.categorys,
  themeType: (state: RootState) => state.Theme.themeType,
};
