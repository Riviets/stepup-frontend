import { useState, useEffect } from "react";

export default function useFetch(fetchFunction){
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        fetchData()
    }, [fetchFunction])

    async function fetchData(){
        try{
            setIsLoading(true)
            const response = await fetchFunction
        }
        catch(error){
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    async function refetch(){
        fetchData()
    }

    return {data, error, isLoading, refetch}
}