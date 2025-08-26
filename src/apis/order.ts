import { OrderRequest } from "../stores/orderStore";
import { api } from "./api";

export const orderAPI = {
  addOrder: async (orderData: OrderRequest) => {
    const response = await api.post("/order", orderData);
    console.log("주문 생성 api", response.data);
    return response.data;
  },
};
