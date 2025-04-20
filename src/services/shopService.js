import axiosInstance from "./axiosInstance";

export const shopService = {
  getCards: async () => {
    try {
      const response = await axiosInstance.get("/shop/cards");
      return response;
    } catch (error) {
      throw error;
    }
  },

  getUserCards: async () => {
    try {
      const response = await axiosInstance.get("/shop/my-cards");
      return response;
    } catch (error) {
      throw error;
    }
  },

  purchaseCard: async (cardId) => {
    try {
      const response = await axiosInstance.post("/shop/purchase", { cardId });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getCardInfoById: async (cardId) => {
    try {
      const response = await axiosInstance.get(`/shop/card/${cardId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
