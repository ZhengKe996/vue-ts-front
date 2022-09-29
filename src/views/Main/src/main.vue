<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list />
    </div>

    <m-trigger-menu v-if="isMobileTerminal" class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
      <m-trigger-menu-item icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200"> 首页 </m-trigger-menu-item>
      <m-trigger-menu-item v-if="userStore.getToken" icon="vip" iconClass="fill-zinc-400 dark:fill-zinc-500" textClass="text-zinc-400 dark:text-zinc-500" @click="onVipClick">
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item icon="profile" iconClass="fill-zinc-400 dark:fill-zinc-500" textClass="text-zinc-400 dark:text-zinc-500" @click="onMyClick">
        {{ userStore.getToken ? '我的' : '登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import Navigation from '@/components/navigation'
import { List } from '@/components/list'
import { isMobileTerminal } from '@/utils/flexible'
import { ROUTER_TYPE_ENUM } from '@/constants'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

/**
 * VIP 按钮点击事件
 */
const onVipClick = () => {
  // 配置跳转方式
  router.push('/member')
}
/**
 * 我的按钮点击事件
 */
const onMyClick = () => {
  // 移动端下跳转的类型
  appStore.changeRouterType(ROUTER_TYPE_ENUM.PUSH)

  // 配置跳转方式
  if (userStore.getToken) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}
</script>
