<script lang="ts" setup name="main">
import { watch } from 'vue'
import { useAppStore } from '@/store/app'
import { useThemeStore } from '@/store/theme'
import { changeTheme } from '@/utils/theme'

const appStore = useAppStore()
const themeStore = useThemeStore()

// 初始化主题
watch(
  () => themeStore.getThemeType,
  (value) => {
    changeTheme(value)
  },
  { immediate: true }
)
</script>

<template>
  <div class="h-screen fixed top-0 left-0 w-screen">
    <m-transition-router-view mainComponentName="main" :routerType="appStore.routerType"></m-transition-router-view>
  </div>
</template>
