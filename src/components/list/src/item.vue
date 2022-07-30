<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{
        backgroundColor: randomRGB(),
      }"
    >
      <!-- 图片 -->
      <img
        v-lazy
        ref="imgTarget"
        class="w-full rounded bg-transparent"
        :src="pexel.photo"
        :style="{
          height: (width! / pexel.photoWidth) * pexel.photoHeight + 'px',
        }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>

        <!-- 点赞 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>

        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          icon="download"
          size="small"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        ></m-button>

        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          icon="full"
          size="small"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ pexel.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="pexel.avatar" alt="" />
      <span class="text-sm text-zinc-500 ml-1">{{ pexel.author }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFullscreen } from "@vueuse/core";
import { saveAs } from "file-saver";
import { message } from "@/libs";
import { Pexel } from "@/constants";
import { randomRGB } from "@/utils/color";

const { pexel } = defineProps<{ pexel: Pexel; width?: number }>();
const imgTarget = ref<HTMLImageElement>();

/**
 * 生成全屏方法
 */
const { enter: onImgFullScreen } = useFullscreen(imgTarget);

/**
 * 下载按钮点击事件
 */
const onDownload = () => {
  // 提示消息
  message("success", "图片开始下载");
  /**
   * 接收两个参数：
   * 1. 下载的图片链接
   * 2. 下载的文件名称
   */
  setTimeout(() => {
    saveAs(pexel.photoDownLink, `${pexel.title} - 作者：${pexel.author}`);
  }, 300);
};
</script>
