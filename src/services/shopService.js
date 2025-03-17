import axios from 'axios'

const API_URL = 'http://localhost:3000/shop'

export const shopService = {
    getCards: async () => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/cards`,{
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

    getUserCards: async () => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/my-cards`,{
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

    purchaseCard: async (cardId) => {
        try{
            const response = await axios.post(`${API_URL}/purchase`, cardId, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
        }
        catch(error){
            throw error
        }
    }
}