import { api } from "./api";

export const chatAPI = {
  sendChat: async (
    storeId: string,
    data: { sessionId: string; message: string }
  ) => {
    const response = await api.post(`/chatbot/${storeId}`, data);
    console.log(response.data);
    return response.data;
  },
};
