<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="login-bg"></div>

    <!-- 登录卡片 -->
    <div class="login-card">
      <div class="login-header">
        <img
          src="@/assets/logo.png"
          class="login-logo"
          alt="酒店预订管理系统"
        />
        <h1 class="login-title">用户登录</h1>
        <p class="login-desc">欢迎回来，请登录您的账户</p>
      </div>

      <a-form
        @finish="handleLogin"
        layout="vertical"
        class="login-form"
        :model="formData"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input
            v-model:value="formData.username"
            placeholder="请输入用户名"
            size="large"
            prefix-icon="user"
          />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入密码"
            size="large"
            prefix-icon="lock"
          />
        </a-form-item>

        <div class="form-actions">
          <a-checkbox v-model:checked="formData.remember">记住我</a-checkbox>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            class="login-btn"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <!-- 注册跳转 -->
      <div class="register-link">
        <span>还没有账户？</span>
        <a-button type="text" @click="goToRegister" class="register-btn">
          立即注册
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

// 表单数据
const formData = ref({
  username: "",
  password: "",
  remember: false,
});

// 登录处理
const handleLogin = () => {
  const { username, password } = formData.value;

  const isLoggedIn = userStore.login(username, password);
  console.log("登录验证结果:", isLoggedIn);

  if (isLoggedIn) {
    // 调用 loginSuccess 方法更新登录状态
    userStore.loginSuccess(username);
    message.success("登录成功");
    router.push("/");
  } else {
    message.error("用户名或密码错误");
  }
};

// 跳转到注册页面
const goToRegister = () => {
  router.push("/user/register");
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
}

/* 背景样式 */
.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://picsum.photos/seed/hotel-login/1920/1080");
  background-size: cover;
  background-position: center;
  filter: blur(5px);
  z-index: 1;
}

/* 登录卡片 */
.login-card {
  width: 100%;
  max-width: 420px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 30px 40px;
  position: relative;
  z-index: 2;
}

/* 头部样式 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-logo {
  height: 60px;
  margin-bottom: 20px;
}

.login-title {
  font-size: 26px;
  color: #1f2329;
  margin-bottom: 8px;
  font-weight: 600;
}

.login-desc {
  color: #606266;
  font-size: 14px;
}

/* 表单样式 */
.login-form {
  margin-bottom: 20px;
}

.ant-input-affix-wrapper {
  border-radius: 8px;
  height: 50px;
}

/* 表单操作区 */
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
}

.forgot-password {
  color: #1890ff;
  text-decoration: none;
}

.forgot-password:hover {
  color: #096dd9;
  text-decoration: underline;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
}

/* 注册链接 */
.register-link {
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid #f0f2f5;
  margin-top: 15px;
  font-size: 14px;
  color: #606266;
}

.register-btn {
  color: #1890ff;
  padding: 0 5px;
  font-size: 14px;
}

.register-btn:hover {
  color: #096dd9;
  text-decoration: underline;
}

/* 响应式调整 */
@media (max-width: 576px) {
  .login-card {
    padding: 25px 20px;
  }

  .login-title {
    font-size: 22px;
  }
}
</style>
