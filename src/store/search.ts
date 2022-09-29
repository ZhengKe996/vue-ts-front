import { defineStore } from 'pinia'

export interface SearchState {
  historys: string[]
}

export const useSearchStore = defineStore({
  id: 'search',
  state: (): SearchState => {
    return { historys: [] }
  },
  getters: {
    getHistorys(): string[] {
      return this.historys
    }
  },
  actions: {
    /**
     * 1. 新增的历史记录位于头部
     * 2. 不可出现重复的记录
     */
    addHistory(newHistory: string) {
      const isFindIndex = this.historys.findIndex((item) => item === newHistory)

      // 剔除旧数据
      if (isFindIndex !== -1) {
        this.historys.splice(isFindIndex, 1)
      }
      // 新增记录
      this.historys.unshift(newHistory)
    },
    /**
     * 删除指定数据
     */
    deleteHistory(index: number) {
      this.historys.splice(index, 1)
    },
    /**
     * 删除所有历史记录
     */
    deleteAllHistory() {
      this.historys = []
    }
  }
})
