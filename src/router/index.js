import Vue from "vue";
import VueRouter from "vue-router";
// 重写 VueRouter的push方法
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
    // 重定向路由
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("views/home/Home.vue"),
    // 路由必须一一对应
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("views/category/Category.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("views/cart/Cart.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("views/profile/Profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
