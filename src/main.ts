import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import "./styles/index.scss";
import router from "./router";
import mLibs from "./libs";

/**
 * @description 注册 svg-icon
 */
import "virtual:svg-icons-register";

import { useREM } from "./utils/flexible";
useREM();

const app = createApp(App);
app.use(router).use(mLibs);
app.mount("#app");
