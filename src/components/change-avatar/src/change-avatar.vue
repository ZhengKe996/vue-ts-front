<template>
  <div class="overflow-auto relative flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img class="" ref="imageTarget" :src="blob" />

    <m-button
      class="mt-4 w-[80%] xl:w-1/2"
      :loading="loading"
      @click="onConfirmClick"
    >
      确定
    </m-button>
  </div>
</template>

<script lang="ts">
const EMITS_CLOSE = "close";
/**
 * @description 移动端配置对象
 * @viewMode 将裁剪框限制在画布的大小
 * @dragMode 移动画布，裁剪框不动
 * @aspectRatio 裁剪框固定纵横比：1:1
 * @cropBoxMovable 裁剪框不可移动
 * @cropBoxResizable 不可调整裁剪框大小
 */
const mobileOptions = {
  viewMode: 1,
  dragMode: "move",
  aspectRatio: 1,
  cropBoxMovable: false,
  cropBoxResizable: false,
};

/**
 * @description PC端配置对象
 * @aspectRatio 裁剪框固定纵横比：1:1
 *
 */
const pcOptions = {
  aspectRatio: 1,
};
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { message } from "@/libs";
import { isMobileTerminal } from "@/utils/flexible";
import { getOSSClient } from "@/utils/sts";
defineProps<{ blob: string }>();
const emits = defineEmits([EMITS_CLOSE]);

/**
 * 图片裁剪处理
 */
const imageTarget = ref<HTMLImageElement>();
let cropper: Cropper;
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(
    imageTarget.value!,
    isMobileTerminal.value ? mobileOptions : pcOptions
  );
});

/**
 * 确定按钮点击事件
 */
const loading = ref<boolean>(false);
const onConfirmClick = () => {
  loading.value = true;
  // 获取裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 地址
    // console.log(URL.createObjectURL(blob!));
    putObjectToOSS(blob!);
  });
};

/**
 * 进行 OSS 上传
 */
let ossClient: any;
let store = useStore();
const putObjectToOSS = async (file: Blob) => {
  if (!ossClient) {
    ossClient = await getOSSClient();
  }
  try {
    const fileTypeArr = file.type.split("/");
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`;
    // 文件存放路径，文件
    const res = await ossClient.put(`images/${fileName}`, file);
  } catch (e: any) {
    message("error", e);
  }
};
/**
 * 关闭事件
 */
const close = () => {
  emits(EMITS_CLOSE);
};
</script>
