import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import UserLogin from "@/views/UserLogin.vue";
import UserRegister from "@/views/UserRegister.vue";
import UserBook from "@/views/UserBook.vue";
import UserOrders from "@/views/UserOrders.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/user/login",
    name: "UserLogin",
    component: UserLogin,
  },
  {
    path: "/user/register",
    name: "UserRegister",
    component: UserRegister,
  },
  {
    path: "/user/book",
    name: "UserBook",
    component: UserBook,
  },
  {
    path: "/user/order",
    name: "UserOrders",
    component: UserOrders,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
