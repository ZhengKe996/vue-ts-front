<template>
  <div>
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexlesData"
    >
      <m-waterfall
        class="px-1 w-full"
        :data="pexelList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <list-item :pexel="item" :width="width" @click="onToPins" />
        </template>
      </m-waterfall>
    </m-infinite>

    <!-- 大图详情处理 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-component v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";
import { getPexels } from "@/api/pexels";
import { Pexel } from "@/constants";
import { isMobileTerminal } from "@/utils/flexible";
import ListItem from "./item.vue";
import PinsComponent from "@/components/pins";
const store = useStore();
/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20,
};

// 数据是否加载中
const loading = ref<boolean>(false);

// 数据是否全部加载完成
const isFinished = ref<boolean>(false);

const pexelList = ref<Pexel[]>([]);
const getPexlesData = async () => {
  // 数据全部加载完 return
  if (isFinished.value) return;

  // 完成了第一次请求后，后续的请求让page自增
  if (pexelList.value.length) {
    query.page += 1;
  }

  // 触发接口
  const { data } = await getPexels();
  if (query.page === 1) {
    pexelList.value = data;
  } else {
    pexelList.value.push(...data);
  }

  // 判断数据是否全部加载完成
  if (pexelList.value.length === data.length * 10) {
    isFinished.value = true;
  }

  // 修改 loading 标记
  loading.value = false;
};

/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = (newQuery: any) => {
  query = { ...query, ...newQuery };
  // 重置状态
  isFinished.value = false;
  pexelList.value = [];
};

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      categoryId: currentCategory.id,
    });
  }
);

/**
 * 监听搜索内容项的变化
 */
watch(
  () => store.getters.searchText,
  (value) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      searchText: value,
    });
  }
);

// 控制 pins 展示
const isVisiblePins = ref<boolean>(false);

// 当前选中的 pins 属性
const currentPins = ref<any>({});

/**
 * 进入 pins
 */
const onToPins = (item: {
  id: string;
  localtion: { translateX: number; translateY: number };
}) => {
  history.pushState(null, "", `/pins/${item.id}`);
  currentPins.value = item;
  isVisiblePins.value = true;
};

/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, "popstate", () => {
  isVisiblePins.value = false;
});

/**
 * 进入动画开始前
 */
const beforeEnter = (el: HTMLElement) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: "0 0",
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0,
  });
};
/**
 * 进入动画执行中
 */
const enter = (el: HTMLElement, done: any) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done,
  });
};
/**
 * 离开动画执行中
 */
const leave = (el: HTMLElement, done: any) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.localtion?.translateX,
    y: currentPins.value.localtion?.translateY,
    opacity: 0,
  });
};
</script>
