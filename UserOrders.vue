<template>
  <div class="history-orders">
    <h2>历史订单</h2>
    <table>
      <thead>
      <tr>
        <th>订单 ID</th>
        <th>房间名称</th>
        <th>价格</th>
        <th>入住日期</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="order in orders"
        :key="order.id"
        :style="{
            backgroundColor: order.isCancelled ? 'lightgray' : 'white',
          }"
      >
        <td :class="{ 'cancelled-order': order.isCancelled }">
          {{ order.id }}
        </td>
        <td :class="{ 'cancelled-order': order.isCancelled }">
          {{ order.roomName }}
        </td>
        <td :class="{ 'cancelled-order': order.isCancelled }">
          {{ order.price }}
        </td>
        <td :class="{ 'cancelled-order': order.isCancelled }">
          {{ order.checkInDate }}
        </td>
        <td>
          <button
            :disabled="
                isOrderDatePassed(order.checkInDate) || order.isCancelled
              "
            @click="cancelOrder(order.id)"
          >
            取消预订
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();
const orders = computed(() => orderStore.orders);

const isOrderDatePassed = (checkInDate) => {
  const currentDate = new Date().toISOString().split("T")[0];
  return checkInDate <= currentDate;
};

const cancelOrder = (orderId) => {
  try {
    orderStore.cancelOrder(orderId);
    alert("订单取消成功！");
  } catch (error) {
    alert("订单取消失败，请稍后重试！");
  }
};
</script>

<style scoped>
.history-orders {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
/* 添加划掉文字的样式类 */
.cancelled-order {
  text-decoration: line-through;
}
</style>
