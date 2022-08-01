import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/Main"),
      },
      {
        path: "/pins/:id",
        name: "pins",
        component: () => import("@/views/pins"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile"),
      },
      {
        path: "/member",
        name: "member",
        component: () => import("@/views/member"),
      },
    ],
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
