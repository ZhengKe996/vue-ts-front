import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM, Category, ROUTER_TYPE_ENUM } from '@/constants'
import { isMobileTerminal } from '@/utils/flexible'

export interface AppState {
  // 当前选中的分类
  currentCategory: Category
  // 搜索的文本
  searchText: string
  // 路由跳转类型
  routerType: 'none' | 'push' | 'back'
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      currentCategory: ALL_CATEGORY_ITEM,
      searchText: '',
      routerType: ROUTER_TYPE_ENUM.NONE
    }
  },
  getters: {
    getCurrentCategory(): Category {
      return this.currentCategory
    },
    getRouterType(): 'none' | 'push' | 'back' {
      if (!isMobileTerminal.value) {
        return ROUTER_TYPE_ENUM.NONE
      }
      return this.routerType
    },
    getSearchText(): string {
      return this.searchText
    }
  },
  actions: {
    changeCurrentCategory(newCategory: Category) {
      this.currentCategory = newCategory
    },
    changeSearchText(newSearchText: string) {
      this.searchText = newSearchText
    },
    changeRouterType(newType: ROUTER_TYPE_ENUM) {
      this.routerType = newType
    }
  }
})
