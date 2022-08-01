<template>
  <div
    class="w-5 flex flex-col items-center justify-center col mx-0.5"
    @click="onItemClick"
  >
    <m-svg-icon
      :name="icon"
      :fillClass="iconClass"
      class="w-2 h-2"
    ></m-svg-icon>
    <p class="text-sm mt-0.5" :class="textClass">
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
interface Props {
  icon: string;
  iconClass?: string;
  textClass?: string;
  to?: string;
}
const { to } = withDefaults(defineProps<Props>(), {
  textClass: "text-zinc-900 dark:text-zinc-200",
});

const router = useRouter();
const onItemClick = () => {
  if (!to) {
    return;
  }
  router.push(to);
};
</script>
