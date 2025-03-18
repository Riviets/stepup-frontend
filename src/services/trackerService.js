import axios from 'axios';

const API_URL = 'http://localhost:3000/tracker';

export const trackerService = {
  addHabitToTracker: async (habitId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${API_URL}/add`,
        { habitId }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response 
    } catch (error) {
        throw error
    }
  },

  completeHabit: async (habitId, date) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${API_URL}/complete`,
        { habitId, date }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response
    } catch (error) {
        throw error
    }
  },

  getHabitsInTracker: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response 
    } catch (error) {
        throw error
    }
  },

  getDailyCompletions: async (date) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/completions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: { date }, 
      });
      return response 
    } catch (error) {
        throw error
    }
  },

  removeHabitFromTracker: async (habitId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete(`${API_URL}/remove`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { habitId }, 
      });
      return response; 
    } catch (error) {
        throw error
    }
  },

  claimBonus: async (date) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(`${API_URL}/claim-bonus`,{ date },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response; 
    } catch (error) {
        throw error
    }
  },

  getAnalytics: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/analytics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response
    } catch (error) {
      throw error
    }
  },
};