<script lang="ts" setup name="main">
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <div class="h-screen fixed top-0 left-0 w-screen">
    <m-transition-router-view
      mainComponentName="main"
      :routerType="store.getters.routerType"
    ></m-transition-router-view>
  </div>
</template>
