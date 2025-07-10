// src/stores/user.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    // 从 localStorage 中读取用户数据，如果没有则初始化为空 Map
    users: new Map(JSON.parse(localStorage.getItem("users") || "[]")),
    currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"), // 当前登录用户
    isLoggedIn: false, // 全局登录状态标志
  }),
  actions: {
    loginSuccess(username) {
      this.currentUser = { username }; // 保存当前登录用户
      this.isLoggedIn = true; // 设置为已登录
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser)); // 持久化
    },
    // 登出时重置状态
    logout() {
      this.currentUser = null;
      this.isLoggedIn = false;
      localStorage.removeItem("currentUser");
    },
    // 注册用户
    register(username, password) {
      if (this.users.has(username)) {
        return false; // 用户名已存在
      }
      this.users.set(username, password);
      // 将用户数据保存到 localStorage
      localStorage.setItem(
        "users",
        JSON.stringify(Array.from(this.users.entries()))
      );
      return true; // 注册成功
    },

    // 验证登录
    login(username, password) {
      return this.users.get(username) === password;
    },
  },
});
