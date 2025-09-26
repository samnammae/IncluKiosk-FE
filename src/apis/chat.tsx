import { api } from "./api";

export const chatAPI = {
  sendChat: async (
    storeId: string,
    data: { sessionId: string; message: string }
  ) => {
    const response = await api.post(`/chatbot/${storeId}`, data);
    console.log(response.data);
    return {
      sessionId: "b78a9ba2-4b2e-4b41-a178-a576189a1c8d",
      aiMessage: "어쩌구저쩌구저쩌구 어쩌구 저쩌구",
    };
  },
};
