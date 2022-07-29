import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import "./styles/index.scss";
import router from "./router";
import mLibs from "./libs";
import mDirectives from "./directives";
import store from "./store";

/**
 * @description 注册 svg-icon
 */
import "virtual:svg-icons-register";

import { useREM } from "./utils/flexible";
import useTheme from "./utils/theme";

useREM();
useTheme();

const app = createApp(App);
app.use(router).use(mLibs).use(store).use(mDirectives);
app.mount("#app");
