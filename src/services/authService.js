import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const authService = {
  registerUser: async (userData) => {
    try {
      const { username, email, password } = userData;
      const response = await axios.post(
        `${API_URL}/auth/register`,
        { username, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response; 
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Помилка реєстрації');
      }
      throw new Error('Не вдалося підключитися до сервера');
    }
  },

  loginUser: async (userData) => {
    try {
      const { email, password } = userData;
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Помилка входу');
      }
      throw new Error('Не вдалося підключитися до сервера');
    }
  },

  logoutUser: () => {
    localStorage.removeItem('accessToken');
  },

  getCurrentUser: async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')      
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json', 
        },
      });
      return response;
    } catch (error) {
      throw error
    }
  },
};