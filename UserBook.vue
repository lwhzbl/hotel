<template>
  <div class="user-book-container">
    <div class="booking-card">
      <h1 class="booking-title">房间预定</h1>

      <a-form
        @finish="handleBook"
        @valuesChange="calculateTotal"
        :model="formData"
        layout="vertical"
      >
        <a-form-item
          label="房间类型"
          name="roomType"
          :rules="[{ required: true, message: '请选择房间类型' }]"
        >
          <a-select
            v-model:value="formData.roomType"
            placeholder="请选择房间类型"
          >
            <a-select-option value="single">单人间 - ¥388/晚</a-select-option>
            <a-select-option value="standard">标准间 - ¥588/晚</a-select-option>
            <a-select-option value="family">家庭套房 - ¥888/晚</a-select-option>
            <a-select-option value="luxury">豪华套房 - ¥988/晚</a-select-option>
          </a-select>
        </a-form-item>

        <div class="date-range">
          <a-form-item
            label="入住日期"
            name="checkInDate"
            :rules="[{ required: true, message: '请选择入住日期' }]"
          >
            <a-date-picker
              v-model:value="formData.checkInDate"
              placeholder="选择入住日期"
              :disabled-date="disabledStartDate"
            />
          </a-form-item>

          <a-form-item
            label="退房日期"
            name="checkOutDate"
            :rules="[{ required: true, message: '请选择退房日期' }]"
          >
            <a-date-picker
              v-model:value="formData.checkOutDate"
              placeholder="选择退房日期"
              :disabled-date="disabledEndDate"
            />
          </a-form-item>
        </div>

        <a-form-item
          label="入住人数"
          name="guests"
          :rules="[{ required: true, message: '请选择入住人数' }]"
        >
          <a-select
            v-model:value="formData.guests"
            placeholder="请选择入住人数"
          >
            <a-select-option value="1">1人</a-select-option>
            <a-select-option value="2">2人</a-select-option>
            <a-select-option value="3">3人</a-select-option>
            <a-select-option value="4">4人</a-select-option>
            <a-select-option value="5+">5人及以上</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 费用计算区域 -->
        <div class="price-summary">
          <div class="summary-item">
            <span>房间类型</span>
            <span>{{ roomTypeText }}</span>
          </div>
          <div class="summary-item">
            <span>入住天数</span>
            <span>{{ days }} 天</span>
          </div>
          <div class="summary-item">
            <span>单价</span>
            <span>¥{{ pricePerNight }}/晚</span>
          </div>
          <div class="summary-total">
            <span>总计费用</span>
            <span class="total-price">¥{{ totalPrice }}</span>
          </div>
        </div>

        <a-form-item class="submit-button">
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            :disabled="!canSubmit"
          >
            确认预定
          </a-button>
        </a-form-item>
      </a-form>
    </div>

    <!-- 房间详情侧边栏 -->
    <div class="room-details">
      <h2 class="details-title">房间详情</h2>
      <div class="room-info-card" v-for="room in roomTypes" :key="room.id">
        <h3 class="room-name">{{ room.name }}</h3>
        <div class="room-tags">
          <span class="tag" v-for="(tag, index) in room.tags" :key="index">{{
            tag
          }}</span>
        </div>
        <p class="room-price">¥{{ room.price }}/晚</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import type { Dayjs } from "dayjs";
import { useAuth } from "@/composables/useAuth";
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();
const router = useRouter();
const { isLoggedIn } = useAuth();

// 房间类型数据（与主页保持一致）
const roomTypes = [
  {
    id: 1,
    name: "单人间",
    price: 388,
    tags: ["1.5米单人床", "独立卫浴", "免费WiFi", "20㎡", "简约风格", "含早餐"],
    value: "single",
  },
  {
    id: 2,
    name: "标准间",
    price: 588,
    tags: [
      "两张1.2米床",
      "独立卫浴",
      "高速网络",
      "33㎡",
      "商务办公区",
      "含早餐",
    ],
    value: "standard",
  },
  {
    id: 3,
    name: "家庭套房",
    price: 888,
    tags: ["1大1小床", "儿童游乐区", "独立客厅", "60㎡", "家庭卫浴", "含早餐"],
    value: "family",
  },
  {
    id: 4,
    name: "豪华套房",
    price: 988,
    tags: ["2米特大床", "按摩浴缸", "独立起居室", "80㎡", "行政礼遇", "含早餐"],
    value: "luxury",
  },
];

// 表单数据
const formData = ref({
  roomType: "",
  checkInDate: null as Dayjs | null,
  checkOutDate: null as Dayjs | null,
  guests: "1",
});

// 计算相关变量
const days = ref(0);
const pricePerNight = ref(0);
const totalPrice = ref(0);

// 房间类型文本
const roomTypeText = computed(() => {
  const room = roomTypes.find((r) => r.value === formData.value.roomType);
  return room ? room.name : "";
});

// 检查是否可以提交
const canSubmit = computed(() => {
  return (
    formData.value.roomType &&
    formData.value.checkInDate &&
    formData.value.checkOutDate &&
    days.value > 0
  );
});

// 计算总价
const calculateTotal = () => {
  // 重置计算
  days.value = 0;
  pricePerNight.value = 0;
  totalPrice.value = 0;

  // 获取选中房间的单价
  const selectedRoom = roomTypes.find(
    (r) => r.value === formData.value.roomType
  );
  if (selectedRoom) {
    pricePerNight.value = selectedRoom.price;
  }

  // 计算天数
  if (formData.value.checkInDate && formData.value.checkOutDate) {
    const inDate = formData.value.checkInDate;
    const outDate = formData.value.checkOutDate;

    // 确保退房日期晚于入住日期
    if (outDate.isAfter(inDate)) {
      days.value = outDate.diff(inDate, "day");
      totalPrice.value = days.value * pricePerNight.value;
    }
  }
};

// 监听日期变化重新计算
watch(
  () => [
    formData.value.checkInDate,
    formData.value.checkOutDate,
    formData.value.roomType,
  ],
  () => {
    calculateTotal();
  }
);

const disabledStartDate = (current: Dayjs) => {
  // 将 current 转换为时间戳（毫秒），并与今天凌晨的时间戳比较
  return current && current.valueOf() < new Date().setHours(0, 0, 0, 0);
};

// 退房日期不能早于入住日期
const disabledEndDate = (current: Dayjs) => {
  if (!formData.value.checkInDate) {
    return current && current < new Date().setHours(0, 0, 0, 0);
  }
  return current && current <= formData.value.checkInDate;
};

// 提交预定
const handleBook = () => {
  if (!isLoggedIn) {
    router.push("/user/login");
    alert("请先登录才能进行预订！");
    // 跳转到登录页面
    return;
  }
  // 这里可以添加实际预定逻辑，如调用API
  console.log("预定信息：", {
    ...formData.value,
    days,
    totalPrice,
  });

  // 添加订单到订单存储
  const selectedRoom = roomTypes.find(
    (r) => r.value === formData.value.roomType
  );
  if (selectedRoom && formData.value.checkInDate) {
    const checkInDate = formData.value.checkInDate.format("YYYY-MM-DD");
    orderStore.addOrder(selectedRoom.name, totalPrice.value, checkInDate);
  }

  // 显示成功消息并返回首页
  alert(
    `预定成功！\n房间类型：${roomTypeText.value}\n入住天数：${days.value}天\n总费用：¥${totalPrice.value}`
  );
  router.push("/");
};
</script>

<style scoped>
.user-book-container {
  display: flex;
  gap: 30px;
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 预定表单卡片 */
.booking-card {
  flex: 2;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 30px;
}

.booking-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #1890ff;
  text-align: center;
}

.date-range {
  display: flex;
  gap: 15px;
}

.date-range .ant-form-item {
  flex: 1;
}

/* 价格摘要 */
.price-summary {
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #e8e8e8;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  margin-top: 10px;
  border-top: 2px solid #e8e8e8;
  font-weight: bold;
}

.total-price {
  color: #f5222d;
  font-size: 18px;
}

.submit-button {
  margin-top: 20px;
  text-align: center;
}

/* 房间详情侧边栏 */
.room-details {
  flex: 1;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 30px;
  height: fit-content;
}

.details-title {
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}

.room-info-card {
  padding: 15px;
  border-radius: 6px;
  background-color: #f9f9f9;
  margin-bottom: 15px;
}

.room-name {
  font-size: 16px;
  margin-bottom: 10px;
}

.room-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  background-color: #e6f7ff;
  color: #1890ff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.room-price {
  color: #f5222d;
  font-weight: bold;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .user-book-container {
    flex-direction: column;
  }

  .date-range {
    flex-direction: column;
    gap: 0;
  }
}
</style>
