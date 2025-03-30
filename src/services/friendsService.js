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
            const response = await axios.post(`${API_URL}/request`,
                {
                    friend_id: friendId
                },
                {
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            })
            return response
        }
        catch(error){
            console.log('Помилка:', error.response?.data || error.message);
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
    },
    deleteFriend: async (friendId) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await axios.delete(`${API_URL}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', 
            },
            data: { friend_id: friendId } 
          });
          return response; 
        } catch (error) {
          throw error;
        }
      }
}