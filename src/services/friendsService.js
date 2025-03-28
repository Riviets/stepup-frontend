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
    },
    getUSerRequests: async () => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/requests`, {
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
    sendFriendshipRequest: async (friendId) => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.post(`${API_URL}/request`,{
                params:{
                    friend_id: friendId
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
    respondToFriendshipRequest: async (requestId, isAccepted) => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.patch(`${API_URL}/respond`,
                {
                    request_id: requestId,
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