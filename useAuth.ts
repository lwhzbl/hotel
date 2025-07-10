// composables/useAuth.ts
import { ref } from "vue";

// 从 localStorage 获取用户信息（如果存在）
const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

// 模拟用户登录状态
const isLoggedIn = ref(false);

const login = () => {
  isLoggedIn.value = true;
};

const logout = () => {
  isLoggedIn.value = false;
};

export const useAuth = () => {
  return {
    isLoggedIn,
    login,
    logout,
  };
};
