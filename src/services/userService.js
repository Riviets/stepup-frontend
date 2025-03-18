import axios from "axios";

const API_URL = 'http://localhost:3000/users/me'

export const userService = {
    editAuthUser: async (userData) => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.put(`${API_URL}`, userData, {
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
    deleteAuthUser: async () => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.delete(`${API_URL}`, {
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
    }
}