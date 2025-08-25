import { api } from "./api";

export const shopAPI = {
  getAllShop: async () => {
    const response = await api.get("/admin/store");
    console.log("매장 전체 조회", response.data);
    return response.data.data;
  },
  getShop: async (shopId: number) => {
    const response = await api.get(`/admin/store/${shopId}`);
    console.log("매장 개별 조회", response.data);
    return response.data.data;
  },
};
