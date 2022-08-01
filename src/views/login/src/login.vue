<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部图标 -->
    <pc-header />

    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>

      <!-- 表单 -->
      <vee-form @submit="onLoginHandler">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          :rules="(validateUsername as any)"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          v-model="loginForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        >
        </vee-error-message>
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          :rules="(validatePassword as any)"
          type="password"
          placeholder="密码"
          autocomplete="on"
          v-model="loginForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        >
        </vee-error-message>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onToRegister"
          >
            去注册
          </a>
        </div>

        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
          :isActiveAnim="false"
        >
          登录
        </m-button>
      </vee-form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <!-- <qq-login-vue></qq-login-vue> -->
        <!-- 微信 -->
        <!-- <wx-login-vue></wx-login-vue> -->
      </div>
    </div>
    <slider-captcha
      v-if="isSliderCaptchaVisible"
      @close="isSliderCaptchaVisible = false"
      @success="onCaptchaSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
} from "vee-validate";
import { message } from "@/libs";
import PcHeader from "@/components/login-header";
import SliderCaptcha from "@/components/slider-captcha";
import { validateUsername, validatePassword } from "@/utils/validate";
import { LOGIN_TYPE_USERNAME } from "@/constants";

const router = useRouter();
const store = useStore();

// 控制 sliderCaptcha 展示
const isSliderCaptchaVisible = ref<boolean>(false);

/**
 * 登录触发
 */
const onLoginHandler = () => {
  isSliderCaptchaVisible.value = true;
};

// 登录时的 loading
const loading = ref<boolean>(false);

// 用户输入的用户名和密码
const loginForm = ref<{ username: string; password: string }>({
  username: "",
  password: "",
});

/**
 * 人类行为验证通过
 */
const onCaptchaSuccess = async () => {
  isSliderCaptchaVisible.value = false;
  // 提示消息
  message("success", "登录成功, 即将前往首页");

  // 登录操作
  setTimeout(() => onLogin(), 1000);
};

/**
 * 用户登录行为
 */
const onLogin = async () => {
  loading.value = true;
  try {
    await store.dispatch("User/login", {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME,
    });
  } finally {
    loading.value = false;
  }

  // 执行登录操作
  router.push("/");
};

/**
 * 进入注册页面
 */
const onToRegister = () => {
  // 配置跳转方式
  router.push("/register");
};
</script>
