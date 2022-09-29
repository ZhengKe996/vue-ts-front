<template>
  <mobile v-if="isMobileTerminal" />
  <pc v-else />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategorysStore } from '@/store/category'
import { isMobileTerminal } from '@/utils/flexible'
import Mobile from './mobile/index.vue'
import Pc from './pc/index.vue'

const categorysStore = useCategorysStore()
onMounted(() => categorysStore.useCategoryData())
</script>
