import axiosInstance from "./axiosInstance";

export const levelsService = {
  getAllLevels: async () => {
    try {
      const response = await axiosInstance.get("/levels");
      return response;
    } catch (err) {
      throw err;
    }
  },

  getUserPuzzles: async () => {
    try {
      const response = await axiosInstance.get("/levels/my-puzzles");
      return response;
    } catch (err) {
      throw err;
    }
  },

  getUserSets: async () => {
    try {
      const response = await axiosInstance.get("/levels/puzzle-sets");
      return response;
    } catch (err) {
      throw err;
    }
  },

  unlockLevel: async (levelId) => {
    try {
      const response = await axiosInstance.post("/levels/unlock", {
        levelId,
      });
      return response;
    } catch (err) {
      throw err;
    }
  },
};
