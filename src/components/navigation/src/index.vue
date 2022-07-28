<template>
  <mobile v-if="isMobileTerminal" :categorys="categorys" />
  <pc v-else :categorys="categorys" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { isMobileTerminal } from "@/utils/flexible";
import { getCategory } from "@/api/category";
import { Category, ALL_CATEGORY_ITEM } from "@/constants";
import Mobile from "./mobile/index.vue";
import Pc from "./pc/index.vue";

const categorys = ref<Category[]>([]);
const getCategoryData = async () => {
  const { data } = await getCategory();
  categorys.value = data;
  categorys.value.unshift(ALL_CATEGORY_ITEM);
};
onMounted(() => {
  getCategoryData();
});
</script>
