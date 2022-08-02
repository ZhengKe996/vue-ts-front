<template>
  <div
    class="fixed left-0 bottom-0 w-screen text-center bg-white dark:bg-zinc-800 xl:hidden"
  >
    <!-- 特惠提示 -->
    <discounts />
    <!-- 支付 -->
    <div class="flex justify-between text-xs px-1 py-0.5">
      <div class="text-left text-zinc-900 dark:text-zinc-200">
        <p class="">
          券后合计：<span class="text-red-600 text-[16px] font-sans font-medium"
            >￥</span
          ><span class="text-red-600 text-[22px] font-sans font-medium">9</span>
        </p>
        <p class="text-red-600">优惠券：限时立减 ￥10</p>
      </div>
      <m-button class="w-[120px]" :isActiveAnim="false" @click="onConfirmClick">
        立即开通
      </m-button>
    </div>
    <!-- TODO: popup -->
    <m-popup v-model="isOpenPopup" class="rounded">
      <pay-select :payData="payData" />
    </m-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Discounts from "@/components/discounts";
import PaySelect from "@/components/mobile-pay-select";
defineProps<{ payData: any }>();

const isOpenPopup = ref<boolean>(false);
const onConfirmClick = () => {
  isOpenPopup.value = !isOpenPopup.value;
};
</script>
