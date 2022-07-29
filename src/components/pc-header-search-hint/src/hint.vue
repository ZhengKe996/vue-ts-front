<template>
  <div class="">
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
      v-html="highlightText(item)"
    ></div>
  </div>
</template>

<script lang="ts">
const EMITS_ITEM_CLICK = "itemClick";
</script>

<script setup lang="ts">
import { ref } from "vue";
import { watchDebounced } from "@vueuse/core";
import { getHint } from "@/api/pexels";

const { searchText } = defineProps<{ searchText: string }>();
/**
 * item 被点击触发事件
 */
const emits = defineEmits([EMITS_ITEM_CLICK]);

const hintData = ref<string[]>([]);
const getHintData = async () => {
  if (!searchText) return;

  const { data } = await getHint(searchText);

  hintData.value = data.result;
};

/**
 * 监听搜索文本的变化，并获取对应提示数据
 */
watchDebounced(() => searchText, getHintData, {
  immediate: true,
  // 每次事件触发时，延迟的时间
  debounce: 300,
});

/**
 * 处理关键字高亮
 */
const highlightText = (text: string) => {
  // 生成高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${searchText}</span>`;
  // 构建正则表达式，从《显示文本中》找出与《用户输入文本相同的内容》，使用《高亮标签》进行替换
  const reg = new RegExp(searchText, "gi");
  // 替换
  return text.replace(reg, highlightStr);
};

/**
 * item 点击事件处理
 */
const onItemClick = (item: any) => {
  emits(EMITS_ITEM_CLICK, item);
};
</script>
