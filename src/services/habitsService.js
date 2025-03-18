import axios from 'axios'

const API_URL = 'http://localhost:3000/habits'

export const habitsService = {
    getDefaultHabits: async () => {
        try{
            const response = axios.get(`${API_URL}/default`)
            return response
        }
        catch(error){
            throw error
        }
    },
    getAvailableHabits: async () =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/available`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    },
    getUserHabits: async () =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/my`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    },
    createUserHabit: async (habitData) =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.post(`${API_URL}`, habitData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    },
    editUserHabit: async (habitId, habitData) =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.put(`${API_URL}/${habitId}`, habitData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    },
    deleteUserHabit: async (habitId) =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.delete(`${API_URL}/${habitId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    },

}