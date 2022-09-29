<template>
  <div class="w-full guide-search">
    <m-search v-model="inputValue" @search="onSearchHandler" @clear="onSearchHandler">
      <template #dropdown>
        <!-- 搜索提示 -->
        <search-hint :search-text="inputValue" v-if="inputValue" @itemClick="onSearchHandler" />
        <!-- 最近搜索 -->
        <search-history v-if="!inputValue" @itemClick="onSearchHandler" />
        <search-theme v-if="!inputValue" />
      </template>
    </m-search>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSearchStore } from '@/store/search'
import { useAppStore } from '@/store/app'
import SearchHint from '@/components/pc-header-search-hint'
import SearchHistory from '@/components/pc-header-search-history'
import SearchTheme from '@/components/pc-header-search-theme'
const searchStore = useSearchStore()
const appStore = useAppStore()

const inputValue = ref<string>('')

const onSearchHandler = (value: string) => {
  if (!value) return
  appStore.changeSearchText(value)
  searchStore.addHistory(value)
}
</script>
