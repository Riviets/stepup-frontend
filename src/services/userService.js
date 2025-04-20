import axios from "./axiosInstance";

export const userService = {
  editAuthUser: async (userData) => {
    const response = await axios.put("/users/me", userData);
    return response;
  },

  deleteAuthUser: async () => {
    const response = await axios.delete("/users/me");
    return response;
  },

  editUsername: async ({ username }) => {
    const response = await axios.put("/users/me/username", { username });
    return response;
  },

  searchUsers: async (query) => {
    const response = await axios.get("/users/search", {
      params: { q: query },
    });
    return response;
  },

  getAvatars: async () => {
    const response = await axios.get("/users/avatars");
    return response;
  },

  setAvatar: async (avatarId) => {
    const response = await axios.patch("/users/me/avatar", {
      avatar_id: avatarId,
    });
    return response;
  },
};
