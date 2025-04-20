import axios from "./axiosInstance";

export const authService = {
  registerUser: async (userData) => {
    try {
      const { username, email, password } = userData;
      const response = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Помилка реєстрації");
      }
      throw new Error("Не вдалося підключитися до сервера");
    }
  },

  loginUser: async (userData) => {
    try {
      const { email, password } = userData;
      const response = await axios.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Помилка входу");
      }
      throw new Error("Не вдалося підключитися до сервера");
    }
  },

  logoutUser: () => {
    localStorage.removeItem("accessToken");
  },

  getCurrentUser: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
