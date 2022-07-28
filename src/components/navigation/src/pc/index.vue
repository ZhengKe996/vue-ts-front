<template>
  <div>pc---{{ categorys }}</div>
</template>

<script setup lang="ts">
import { Category } from "@/constants";
defineProps<{ categorys: Category[] }>();
</script>

<style scoped></style>
