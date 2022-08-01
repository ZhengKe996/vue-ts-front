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
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register"),
  },
];

export default routes;
