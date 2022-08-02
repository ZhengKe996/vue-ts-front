<template>
  <div>
    <!-- PC 端支付 -->
    <pc v-if="!isMobileTerminal" :payData="payData" />
    <!-- 移动端支付 -->
    <mobile v-else :payData="payData" />
  </div>
</template>

<script setup lang="ts">
import { isMobileTerminal } from "@/utils/flexible";
import Pc from "./pc/index.vue";
import Mobile from "./mobile/index.vue";
defineProps<{ payData: any }>();
</script>

<style scoped></style>
