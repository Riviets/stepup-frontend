import axios from "./axiosInstance";

export const trackerService = {
  addHabitToTracker: async (habitId) => {
    const response = await axios.post("/tracker/add", { habitId });
    return response;
  },

  completeHabit: async (habitId, date) => {
    const response = await axios.post("/tracker/complete", { habitId, date });
    return response;
  },

  getHabitsInTracker: async () => {
    const response = await axios.get("/tracker");
    return response;
  },

  getDailyCompletions: async (date) => {
    const response = await axios.get("/tracker/completions", {
      params: { date },
    });
    return response;
  },

  removeHabitFromTracker: async (habitId) => {
    const response = await axios.delete("/tracker/remove", {
      data: { habitId },
    });
    return response;
  },

  claimBonus: async (date) => {
    const response = await axios.post("/tracker/claim-bonus", { date });
    return response;
  },

  getAnalytics: async () => {
    const response = await axios.get("/tracker/analytics");
    return response;
  },
};
