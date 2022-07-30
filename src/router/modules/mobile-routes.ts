import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/Main"),
  },
  {
    path: "/pins/:id",
    name: "pins",
    component: () => import("@/views/pins"),
  },
];

export default routes;
