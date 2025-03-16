import { useEffect, useState } from "react"
import Navigation from "./Navigation"
import useFetch from './hooks/useFetch'
import { authService } from "../services/authService"

export default function Profile(){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [userData, setUserData] = useState({})

    useEffect(()=>{
        async function getCurrentUser(){
            try{
                setIsLoading(true)
                const response = await authService.getCurrentUser()
                setUserData(response.data)
            }
            catch(err){
                setError(err)
            }
            finally{
                setIsLoading(false)
            }
        }
        getCurrentUser()
    }, [])

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>{error.message}</div>
    return(
        <div>
            Profile
            <p>
            {userData.username} <br /> {userData.email}
            </p>
            <Navigation />
        </div>
    )
}