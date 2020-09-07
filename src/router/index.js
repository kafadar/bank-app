import Vue from "vue";
import VueRouter from "vue-router";

import Root from "../views/Root.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Root",
    component: Root,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
