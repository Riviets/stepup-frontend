import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const authService = {
    registerUser: async (userData) => {
        try{
            const {username, email, password} = userData
            const response = await axios.post(`${API_URL}/auth/register`, {username, email, password},{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    },
    
    loginUser: async (userData) => {
        try{
            const {email, password} = userData
            const response = await axios.post(`${API_URL}/auth/login`, {email, password},{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    },

    logoutUser: () => {
        localStorage.removeItem('accessToken')
    },

    getCurrentUser: async (accessToken) =>{
        try{
            const response = await axios.get(`${API_URL}/users/me`,{
                headers:{
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'Application/json'
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    }
}