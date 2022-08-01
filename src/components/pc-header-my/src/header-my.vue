<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
        v-if="(this as any).$store.getters.token"
      >
        <img v-lazy class="w-3 h-3 rounded-sm" :src="UserImg" />
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
          name="down-arrow"
        >
        </m-svg-icon>

        <m-svg-icon
          name="vip"
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></m-button>
      </div>
    </template>
    <div
      v-if="(this as any).$store.getters.token"
      class="w-[140px] overflow-hidden"
    >
      <div
        v-for="item of menuArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        @click="onItemClick(item.path)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        >
        </m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">
          {{ item.title }}
        </span>
      </div>
    </div>
  </m-popover>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { confirm } from "@/libs";
import { UserImg } from "@/constants";

const router = useRouter();
const store = useStore();

const menuArr = [
  {
    id: 0,
    title: "个人资料",
    icon: "profile",
    path: "/profile",
  },
  {
    id: 1,
    title: "升级VIP",
    icon: "vip-profile",
    path: "/memeber",
  },
  {
    id: 2,
    title: "退出登录",
    icon: "logout",
    path: "",
  },
];

/**
 * 登录按钮点击事件
 */
const onToLogin = () => {
  // 配置跳转方式
  router.push("/login");
};

/**
 * menu Item 点击事件，也可以根据其他的 key 作为判定，比如 name
 */
const onItemClick = (path: string) => {
  // 有路径则进行路径跳转
  if (path) {
    // 配置跳转方式
    router.push(path);
    return;
  }
  console.log(path);

  // 无路径则为退出登录
  confirm("您确定要退出登录吗？").then(() => {
    // 退出登录不存在跳转路径
    store.dispatch("User/logout");
  });
};
</script>
