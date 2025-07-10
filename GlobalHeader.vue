<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="220px">
        <div class="title-bar">
          <img src="@/assets/logo.png" class="logo" alt="logo" />
          <div class="title">酒店预定管理系统</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="80px">
        <div class="user-login-status" v-if="userStore.isLoggedIn">
          <span>欢迎，{{ userStore.currentUser.username }}</span>
          <a-button type="primary" @click="logouts">退出登录</a-button>
        </div>
        <div class="user-login-status" v-else>
          <a-button type="primary" @click="goToLogin">登录</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import { HomeOutlined, CrownOutlined } from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
const { isLoggedIn, username, logout } = useAuth();
const doMenuClick = ({ key }: { key: string }) => {
  router.push({ path: key });
};
const current = ref<string[]>(["mail"]);
router.afterEach((to, from, next) => {
  current.value = [to.path];
});
const items = ref<MenuProps["items"]>([
  {
    key: "/",
    icon: () => h(HomeOutlined),
    label: "主页",
    title: "主页",
  },
  {
    key: "/user/book",
    label: "我要预定",
    title: "我要预定",
  },
  {
    key: "/user/order",
    label: "历史订单",
    title: "历史订单",
  },
]);

const goToLogin = () => {
  router.push("/user/login");
};
const logouts = () => {
  // 调用 userStore 的 logout 方法清除登录状态
  userStore.logout();
  // 将用户重定向到首页
  router.push("/");
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}
.logo {
  height: 48px;
}

</style>
