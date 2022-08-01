<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <!-- 动画组件 -->
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <!-- 缓存组件 -->
      <keep-alive :include="virtualTaskStack">
        <component
          :is="Component"
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
          :key="$route.fullPath"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

// 路由跳转的 enum
enum ROUTER_TYPE_ENUM {
  NONE = "none",
  PUSH = "push",
  BACK = "back",
}

interface Props {
  routerType?: "none" | "push" | "back";
  mainComponentName: string;
}

const { mainComponentName, routerType } = withDefaults(defineProps<Props>(), {
  routerType: "none",
});

// 任务栈
const virtualTaskStack = ref<string[]>([mainComponentName]);

const router = useRouter();
// 跳转动画
const transitionName = ref("");

/**
 * 监听路由变化
 */
router.beforeEach((to, from) => {
  // 定义当前动画名称
  if (routerType) transitionName.value = routerType;

  if (routerType === ROUTER_TYPE_ENUM.PUSH) {
    // 入栈
    virtualTaskStack.value.push(to.name as string);
  } else if (routerType === ROUTER_TYPE_ENUM.BACK) {
    // 出栈
    virtualTaskStack.value.pop();
  }

  // 进入首页默认清空栈
  if (to.name === mainComponentName) {
    clearTask();
  }
});

// 处理动画状态变化
const isAnimation = ref<boolean>(false);
const beforeEnter = () => {
  isAnimation.value = true;
};
const afterLeave = () => {
  isAnimation.value = false;
};

/**
 * 清空栈
 */
const clearTask = () => {
  virtualTaskStack.value = [mainComponentName];
};
</script>

<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
