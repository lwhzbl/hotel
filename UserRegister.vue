<template>
  <div class="login-page">
    <!-- 保持与登录页相同的外层类名 -->
    <!-- 背景装饰（与登录页完全一致） -->
    <div class="login-bg"></div>

    <!-- 注册卡片（结构与登录卡片一致） -->
    <div class="login-card">
      <div class="login-header">
        <img src="@/assets/logo.png" class="login-logo" alt="酒店预订" />
        <h1 class="login-title">用户注册</h1>
        <!-- 修改标题为注册 -->
        <p class="login-desc">创建新账户，开启您的旅程</p>
        <!-- 修改描述文字 -->
      </div>

      <a-form
        @finish="handleRegister"
        layout="vertical"
        class="login-form"
        :model="formData"
      >
        <!-- 用户名输入框（与登录页样式一致） -->
        <a-form-item
          label="用户名"
          name="username"
          :rules="[
            { required: true, message: '请输入用户名' },
            { min: 2, message: '用户名至少2个字符' },
          ]"
        >
          <a-input
            v-model:value="formData.username"
            placeholder="请设置用户名"
            size="large"
            prefix-icon="user"
          />
        </a-form-item>

        <!-- 手机号输入框（新增项，保持样式统一） -->
        <a-form-item
          label="手机号码"
          name="phone"
          :rules="[
            { required: true, message: '请输入手机号码' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
          ]"
        >
          <a-input
            v-model:value="formData.phone"
            placeholder="请输入手机号码"
            size="large"
            prefix-icon="phone"
          />
        </a-form-item>

        <!-- 密码输入框（与登录页样式一致） -->
        <a-form-item
          label="密码"
          name="password"
          :rules="[
            { required: true, message: '请设置密码' },
            { min: 6, message: '密码至少6个字符' },
          ]"
        >
          <a-input-password
            v-model:value="formData.password"
            placeholder="请设置密码"
            size="large"
            prefix-icon="lock"
          />
        </a-form-item>

        <!-- 确认密码输入框（新增项，保持样式统一） -->
        <a-form-item
          label="确认密码"
          name="confirmPassword"
          :rules="[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]"
        >
          <a-input-password
            v-model:value="formData.confirmPassword"
            placeholder="请再次输入密码"
            size="large"
            prefix-icon="lock"
          />
        </a-form-item>

        <!-- 协议勾选（新增项，风格统一） -->
        <a-form-item>
          <a-checkbox
            v-model:checked="formData.agree"
            :rules="[{ required: true, message: '请同意用户协议' }]"
          >
            我已阅读并同意<a href="#" class="forgot-password"
              >《用户服务协议》</a
            >和<a href="#" class="forgot-password">《隐私政策》</a>
          </a-checkbox>
        </a-form-item>

        <!-- 注册按钮（与登录按钮样式一致） -->
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            class="login-btn"
          >
            注册账户
          </a-button>
        </a-form-item>
      </a-form>

      <!-- 登录跳转（与登录页的注册跳转样式镜像） -->
      <div class="register-link">
        <span>已有账户？</span>
        <a-button type="text" @click="goToLogin" class="register-btn">
          立即登录
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
const registerVisible = ref(false);
const showRegisterModal = () => {
  registerVisible.value = true; // 显示注册模态框
};

// 表单数据（新增手机号和确认密码字段）
const formData = ref({
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agree: false,
});

// 注册表单数据（包含手机号和确认密码）
const registerData = ref({
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agree: false, // 用户协议勾选
});

// 注册处理
const handleRegister = () => {
  const { username, password } = formData.value;

  if (userStore.register(username, password)) {
    message.success("注册成功，请登录");
    registerVisible.value = false;
  } else {
    message.error("用户名已存在");
  }
};

// 跳转到登录页
const goToLogin = () => {
  router.push("/user/login");
};
</script>

<style scoped>
/* 完全复用登录页的样式，仅新增必要样式 */
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
}

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

.login-form {
  margin-bottom: 20px;
}

.ant-input-affix-wrapper {
  border-radius: 8px;
  height: 50px;
}

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

.login-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
}

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

/* 新增协议链接样式，保持风格统一 */
a.ant-checkbox-wrapper a {
  color: #1890ff;
  text-decoration: none;
}

a.ant-checkbox-wrapper a:hover {
  color: #096dd9;
  text-decoration: underline;
}

@media (max-width: 576px) {
  .login-card {
    padding: 25px 20px;
  }

  .login-title {
    font-size: 22px;
  }
}
</style>
