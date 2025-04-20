import axios from "./axiosInstance";

export const habitsService = {
  getDefaultHabits: async () => {
    const response = await axios.get("/habits/default");
    return response;
  },

  getAvailableHabits: async () => {
    const response = await axios.get("/habits/available");
    return response;
  },

  getUserHabits: async () => {
    const response = await axios.get("/habits/my");
    return response;
  },

  createUserHabit: async (habitData) => {
    const { text: name, xp, currency } = habitData;
    const response = await axios.post("/habits", { name, xp, currency });
    return response;
  },

  editUserHabit: async (habitId, habitData) => {
    const { text: name, xp, currency } = habitData;
    const response = await axios.put(`/habits/${habitId}`, {
      name,
      xp,
      currency,
    });
    return response;
  },

  deleteUserHabit: async (habitId) => {
    const response = await axios.delete(`/habits/${habitId}`);
    return response;
  },

  getHabitInfoById: async (habitId) => {
    const response = await axios.get(`/habits/${habitId}`);
    return response;
  },

  getSuggestedHabits: async () => {
    const response = await axios.get("/habits/suggested");
    return response;
  },

  suggestHabit: async (friendId, habitId) => {
    const response = await axios.post("/habits/suggest", {
      friend_id: friendId,
      habit_id: habitId,
    });
    return response;
  },

  respondToSuggestedHabit: async (suggestionId, isAccepted) => {
    const response = await axios.patch("/habits/suggested/respond", {
      suggestion_id: suggestionId,
      accept: isAccepted,
    });
    return response;
  },
};
