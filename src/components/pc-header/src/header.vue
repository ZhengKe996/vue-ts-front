<template>
  <div
    class="w-full duration-500 bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1"
  >
    <div class="flex items-center">
      <img
        v-lazy
        class="h-5 cursor-pointer mr-2 guide-home"
        src="https://front-zk.oss-cn-hangzhou.aliyuncs.com/logo.png"
        @click="onToHome"
      />
      <pc-header-search class="mr-1" />
      <pc-header-theme class="mr-1" />
      <pc-header-my />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import PcHeaderMy from "@/components/pc-header-my";
import PcHeaderSearch from "@/components/pc-header-search";
import PcHeaderTheme from "@/components/pc-header-theme";

const router = useRouter();
const onToHome = () => {
  router.push("/");
};
</script>
