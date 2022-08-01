<template>
  <!-- 头部图标：PC端 -->
  <div class="hidden pt-5 h-8 xl:block">
    <img v-lazy class="m-auto" :src="PcLogo" alt="" />
  </div>
  <!-- 头部图标：移动端 -->
  <div class="h-[111px] xl:hidden">
    <img v-lazy class="dark:hidden" :src="MobileLoginBg" alt="" />
    <img
      v-lazy
      class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
      :src="MobileLogo"
      alt=""
      srcset=""
    />
  </div>
</template>

<script setup lang="ts">
import { MobileLoginBg, MobileLogo, PcLogo } from "@/constants";
</script>
