import axios from 'axios'

const API_URL = 'http://localhost:3000/levels'

export const levelsService = {
    getAllLevels: async () =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        }
        catch(err){
            throw err
        }
    },

    getUserPuzzles: async () =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/my-puzzles`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        }
        catch(err){
            throw err
        }
    },

    getUserSets: async () =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(`${API_URL}/puzzle-sets`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        }
        catch(err){
            throw err
        }
    },
    
    unlockLevel: async (levelId) =>{
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.post(`${API_URL}/unlock`, levelId, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        }
        catch(err){
            throw err
        }
    },
}