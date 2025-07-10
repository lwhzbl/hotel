<template>
  <div class="home-view">
    <!-- 英雄区域 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">豪华酒店，舒适体验</h1>
        <p class="hero-subtitle">享受无与伦比的住宿体验，尽在我们的豪华酒店</p>
        <a-button type="primary" size="large" @click="goToBook"
          >立即预定</a-button
        >
      </div>
    </div>

    <!-- 酒店特色 -->
    <div class="features-section">
      <h2 class="section-title">酒店特色</h2>
      <div class="feature-cards">
        <div class="feature-card">
          <div class="feature-icon">
            <a-icon type="check-circle" theme="filled" />
          </div>
          <h3 class="feature-title">豪华客房</h3>
          <p class="feature-description">
            精心设计的客房，提供极致舒适的休息环境
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <a-icon type="check-circle" theme="filled" />
          </div>
          <h3 class="feature-title">顶级餐饮</h3>
          <p class="feature-description">多国料理，满足您的味蕾享受</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <a-icon type="check-circle" theme="filled" />
          </div>
          <h3 class="feature-title">休闲设施</h3>
          <p class="feature-description">游泳池、健身房、SPA，全方位放松身心</p>
        </div>
      </div>
    </div>

    <!-- 房间类型 -->
    <div class="rooms-section">
      <h2 class="section-title">房间类型</h2>
      <div class="room-cards">
        <div class="room-card" v-for="room in roomTypes" :key="room.id">
          <img :src="room.image" alt="room image" class="room-image" />
          <div class="room-info">
            <h3 class="room-title">{{ room.name }}</h3>
            <p class="room-price">¥{{ room.price }}/晚</p>
            <!-- 房间特点改为标签形式 -->
            <div class="room-tags">
              <span
                class="tag"
                v-for="(tag, index) in room.tags"
                :key="index"
                >{{ tag }}</span
              >
            </div>
            <a-button type="primary" @click="goToBook">立即预定</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { isLoggedIn } = useAuth();

const goToBook = () => {
  if (!isLoggedIn) {
    router.push("/user/login");
    alert("请先登录才能进行预订！");
    // 跳转到登录页面
    return;
  }
  router.push("/user/book");
};
// 四种房间类型，按要求设置为单人间、标准间、家庭套房、豪华套房
const roomTypes = ref([
  {
    id: 1,
    name: "单人间",
    price: 388,
    image: require("@/assets/1.jpg"),
    tags: ["1.5米单人床", "独立卫浴", "免费WiFi", "20㎡", "简约风格", "含早餐"],
  },
  {
    id: 2,
    name: "标准间",
    price: 588,
    image: require("@/assets/2.jpg"),
    tags: [
      "两张1.2米床",
      "独立卫浴",
      "高速网络",
      "33㎡",
      "商务办公区",
      "含早餐",
    ],
  },
  {
    id: 3,
    name: "家庭套房",
    price: 888,
    image: require("@/assets/3.jpg"),
    tags: ["1大1小床", "儿童游乐区", "独立客厅", "60㎡", "家庭卫浴", "含早餐"],
  },
  {
    id: 4,
    name: "豪华套房",
    price: 988,
    image: require("@/assets/4.jpg"),
    tags: ["2米特大床", "按摩浴缸", "独立起居室", "80㎡", "行政礼遇", "含早餐"],
  },
]);
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero-section {
  height: 400px;
  background-image: url("https://picsum.photos/seed/hotel/1200/400");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.hero-content {
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 24px;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
}

.features-section {
  margin-bottom: 60px;
}

.feature-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.feature-card {
  width: 300px;
  padding: 20px;
  text-align: center;
  margin: 10px;
}

.feature-icon {
  font-size: 48px;
  color: #1890ff;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.rooms-section {
  margin-bottom: 60px;
}

.room-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.room-card {
  width: 350px;
  margin: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
}

.room-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.room-info {
  padding: 20px;
}

.room-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.room-price {
  font-size: 18px;
  color: #f5222d;
  margin-bottom: 15px;
}

/* 标签样式 */
.room-tags {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #f0f2f5;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 14px;
  color: #555;
}
</style>
