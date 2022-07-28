<template>
  <div class="w-full guide-search">
    <m-search v-model="inputValue">
      <template #dropdown> hhh </template>
    </m-search>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputValue = ref<string>("");
</script>
