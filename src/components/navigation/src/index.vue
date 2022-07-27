<template>
  <mobile v-if="isMobileTerminal" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { isMobileTerminal } from "@/utils/flexible";
import { getCategory } from "@/api/category";
import Mobile from "./mobile/index.vue";
import Pc from "./pc/index.vue";
const getCategoryData = async () => {
  const res = await getCategory();

  console.log(res);
};
onMounted(() => {
  getCategoryData();
});
</script>
