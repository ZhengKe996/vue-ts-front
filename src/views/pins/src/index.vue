<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <pins-component :id="($route.params.id as string)" />
  </div>
</template>

<script setup lang="ts">
import PinsComponent from "@/components/pins";
</script>
