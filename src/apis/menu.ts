import { api } from "./api";

export const menuAPI = {
  getCategory: async (storeId: number) => {
    const response = await api.get(`/menu/${storeId}/category`);
    console.log("카테고리 조회", response.data);
    return response.data.data;
  },
  getAllMenu: async (storeId: number) => {
    const response = await api.get(`/menu/${storeId}`);
    console.log("메뉴 조회", response.data);
    return response.data.data;
  },
  getAllOptions: async (storeId: number) => {
    const response = await api.get(`/menu/${storeId}/option`);
    console.log("옵션 전체 조회", response.data);
    return response.data.data;
  },
};
