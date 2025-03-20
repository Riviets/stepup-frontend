import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Spinner from "./Spinner";
import { authService } from "../../services/authService";
import xp from '../../assets/xp.png'
import coins from '../../assets/coins.png'

export default function UserStats(){
    const {data: userData, isLoading, error} = useFetch(authService.getCurrentUser)

    if(isLoading) return (<div className="flex justify-center"><Spinner /></div>)
    if(error) return (<div>{error.message}</div>)
    
    return(
        <div className="flex justify-between max-w-[350px] border-2 border-[#483D61] items-center px-[25px] mx-auto rounded-lg bg-[#D9D9D9] font-bold text-lg mb-[35px]">
            <div className="flex items-center gap-2">
                <p>{userData?.xp}</p>
                <img className="min-w-[25px]" src={xp} alt="xp"/>
            </div>
            <div className="flex items-center">
                <p>{userData?.currency}</p>
                <img className="min-w-[40px]" src={coins} alt="coins" />
            </div>
            <p className="text-xl">{userData?.username}</p>
        </div>
    )
}