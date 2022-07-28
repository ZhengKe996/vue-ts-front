// PC 设备指定宽度
export const PC_DEVICE_WIDTH: number = 1280;

// category 的本地构建数据
export const ALL_CATEGORY_ITEM = {
  id: "all",
  name: "全部",
};

// 暗黑主题
export const THEME_DARK = "dark";
// 浅色主题
export const THEME_LIGHT = "light";
// 系统主题
export const THEME_SYSTEM = "system";

export interface Category {
  col: number;
  id: string;
  name: string;
  urlname: string;
}
