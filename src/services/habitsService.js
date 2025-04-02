import axios from 'axios'

const API_URL = 'http://localhost:3000/habits'

export const habitsService = {
    getDefaultHabits: async () => {
        try {
            const response = await axios.get(`${API_URL}/default`)
            return response
        } catch (error) {
            throw error
        }
    },
    getAvailableHabits: async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/available`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        } catch (error) {
            throw error
        }
    },
    getUserHabits: async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/my`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        } catch (error) {
            throw error
        }
    },
    createUserHabit: async (habitData) => {
        try {
            const { text: name, xp, currency } = habitData
            const token = localStorage.getItem('accessToken')
            const response = await axios.post(`${API_URL}`, { name, xp, currency }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        } catch (error) {
            throw error
        }
    },
    editUserHabit: async (habitId, habitData) => {
        try {
            const { text: name, xp, currency } = habitData
            const token = localStorage.getItem('accessToken')
            const response = await axios.put(`${API_URL}/${habitId}`, { name, xp, currency }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        } catch (error) {
            throw error
        }
    },
    deleteUserHabit: async (habitId) => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await axios.delete(`${API_URL}/${habitId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        } catch (error) {
            throw error
        }
    },
    getHabitInfoById: async (habitId) => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/${habitId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        } catch (error) {
            throw error
        }
    },
    getSuggestedHabits: async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/suggested`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        } catch (error) {
            throw error
        }
    },

    suggestHabit: async (friendId, habitId) =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.post(`${API_URL}/suggest`,
            {
                friend_id: friendId,
                habit_id: habitId
            }, 
            {
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    },

    respondToSuggestedHabit: async (suggestionId, isAccepted) =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.patch(`${API_URL}/suggested/respond`,
                {
                    suggestion_id: suggestionId,
                    accept: isAccepted
                },
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
            return response
        }
        catch(error){
            throw error
        }
    }
}