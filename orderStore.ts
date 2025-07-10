import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as {
      id: number;
      roomName: string;
      price: number;
      checkInDate: string;
      isCancelled: boolean;
    }[],
    nextId: 1,
  }),
  actions: {
    addOrder(roomName: string, price: number, checkInDate: string) {
      const newOrder = {
        id: this.nextId++,
        roomName,
        price,
        checkInDate,
        isCancelled: false,
      };
      this.orders.push(newOrder);
    },
    cancelOrder(id: number) {
      const order = this.orders.find((o) => o.id === id);
      if (order) {
        order.isCancelled = true;
      }
    },
  },
});
