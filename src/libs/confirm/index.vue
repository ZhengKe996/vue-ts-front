<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisable"
        @click="closeConfirm"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisable"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{
            cancelText
          }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import mButton from "../button/index.vue";

interface Props {
  title?: string;
  // 描述
  content: string;
  // 取消按钮文本
  cancelText?: string;
  // 确定按钮文本
  confirmText?: string;
  // 取消按钮事件
  cancelHandler?: () => void;
  // 确定按钮事件
  confirmHandler?: () => void;
  // 关闭 confirm 的回调
  close?: () => void;
}
const {
  title,
  content,
  cancelText,
  confirmText,
  cancelHandler,
  confirmHandler,
  close,
} = withDefaults(defineProps<Props>(), {
  cancelText: "取消",
  confirmText: "确定",
});

// 控制显示处理
const isVisable = ref(false);
/**
 * confirm 展示
 */
const show = () => {
  isVisable.value = true;
};
/**
 * 页面构建完成之后，执行。保留动画
 */
onMounted(() => {
  show();
});

// 关闭动画执行时间
const duration = "0.5s";
/**
 * confirm 关闭，保留动画执行时长
 */
const closeConfirm = () => {
  isVisable.value = false;
  setTimeout(() => {
    if (close) {
      close();
    }
  }, parseInt(duration.replace("0.", "").replace("s", "")) * 100);
};

/**
 * 取消按钮点击事件
 */
const onCancelClick = () => {
  if (cancelHandler) {
    cancelHandler();
  }
  closeConfirm();
};

/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {
  if (confirmHandler) {
    confirmHandler();
  }
  closeConfirm();
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
