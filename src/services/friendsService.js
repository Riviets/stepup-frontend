import axiosInstance from "./axiosInstance";

export const friendsService = {
  getUserFriends: async () => {
    try {
      const response = await axiosInstance.get("/users/friends");
      return response;
    } catch (error) {
      throw error;
    }
  },

  getUserRequests: async () => {
    try {
      const response = await axiosInstance.get("/users/friends/requests");
      return response;
    } catch (error) {
      throw error;
    }
  },

  sendFriendshipRequest: async (friendId) => {
    try {
      const response = await axiosInstance.post("/users/friends/request", {
        friend_id: friendId,
      });
      return response;
    } catch (error) {
      console.log("Помилка:", error.response?.data || error.message);
      throw error;
    }
  },

  respondToFriendshipRequest: async (requestId, isAccepted) => {
    try {
      const response = await axiosInstance.patch("/users/friends/respond", {
        request_id: requestId,
        accept: isAccepted,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteFriend: async (friendId) => {
    try {
      const response = await axiosInstance.delete("/users/friends", {
        data: { friend_id: friendId },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
