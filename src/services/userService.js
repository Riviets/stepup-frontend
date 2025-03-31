import axios from "axios";

const API_URL = 'http://localhost:3000/users'

export const userService = {
    editAuthUser: async (userData) => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.put(`${API_URL}/me`, userData, {
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
            const response = await axios.delete(`${API_URL}/me`, {
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
    editUsername: async (data) => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.put(`${API_URL}/me/username`, {username},{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
        }
        catch(error){
            throw error
        }
    },

    searchUsers: async (query) => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/search`,{
                params:{
                    q: query
                },
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

    getAvatars: async ()=>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/avatars`,{
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

    setAvatar: async (avatarId)=>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.patch(`${API_URL}/me/avatar`, {avatar_id: avatarId}, {
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            })
            return response
        }
        catch(error){
            throw error
        }
    }
}