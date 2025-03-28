import axios from 'axios'

const API_URL = 'http://localhost:3000/users/friends'

export const friendsService = {
    getUserFriends: async () =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}`,{
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