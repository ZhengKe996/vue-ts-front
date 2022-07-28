<template>
  <mobile v-if="isMobileTerminal" />
  <pc v-else />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import { isMobileTerminal } from "@/utils/flexible";
import Mobile from "./mobile/index.vue";
import Pc from "./pc/index.vue";

const store = useStore();
onMounted(() => {
  store.dispatch("Category/useCategoryData");
});
</script>
