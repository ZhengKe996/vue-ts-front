<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4">
      <!-- 移动端 navbar 处理 -->
      <m-navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick"> 精选会员 </m-navbar>

      <div class="py-2 px-1">
        <h2 class="text-center text-[34px] font-bold tracking-widest text-yellow-600">精选VIP</h2>
        <p class="text-center text-lg text-yellow-500">升级精选VIP，畅想所有内容</p>
        <div class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          <pay-menu-item v-for="item in vipPayListData" :key="item.id" :hot="item.isHot" :select="item.id === currentPayData.id" :data="item" @click="onChangeCurrentPay"></pay-menu-item>
        </div>
        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>
        <!-- 支付 -->
        <pay-ment class="mt-4" :payData="currentPayData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="member">
import { ref, watch } from 'vue'
import { useAppStore } from '@/store/app'
import { useRouter } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import { getVipPayList } from '@/api/pay'
import PayMenuItem from '@/components/pay-menu-item'
import PayMent from '@/components/payment'
import { ROUTER_TYPE_ENUM } from '@/constants'

interface PayItem {
  id: number
  title: string
  desc: string
  oldPrice: string
  price: string
  isHot: boolean
}
const appStore = useAppStore()
const router = useRouter()

const onNavbarLeftClick = () => {
  // 配置跳转方式
  appStore.changeRouterType(ROUTER_TYPE_ENUM.BACK)
  router.back()
}

/**
 * 列表数据
 */
const vipPayListData = ref<PayItem[]>([])
const getVipPayListData = async () => {
  const { data } = await getVipPayList()
  vipPayListData.value = data
  currentPayData.value = vipPayListData.value[0]
}
getVipPayListData()

/**
 * 选中支付项
 */
const currentPayData = ref<any>({})
const onChangeCurrentPay = (item: any) => {
  currentPayData.value = item
}

// 保存支付数据
watch(currentPayData, () => {})
</script>
