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
          <list-item :pexel="item" :width="width"></list-item>
        </template>
      </m-waterfall>
    </m-infinite>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getPexels } from "@/api/pexels";
import { Pexel } from "@/constants";
import { isMobileTerminal } from "@/utils/flexible";
import ListItem from "./item.vue";
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
</script>
