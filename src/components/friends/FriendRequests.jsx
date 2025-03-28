import { friendsService } from "../../services/friendsService"
import useFetch from "../hooks/useFetch"
import tick from "../../assets/tick.svg"
import close from "../../assets/close.svg"
import { useState } from "react"

export default function FriendRequests({refetchFriends}){
    const {data: userRequests} = useFetch(friendsService.getUSerRequests)

    async function handleConfirm(requestId){
        try{
            await friendsService.respondToFriendshipRequest(requestId, true)
            refetchFriends()
        }
        catch(error){
            console.log(error);
        }
    }

    async function handleReject(requestId){
        try{
            await friendsService.respondToFriendshipRequest(requestId, false)
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            {userRequests?.length === 0 ? 
            <p className="py-6 text-lg font-semibold">No requests yet...</p>
            :
            (
                <ul className="py-6">
                    {userRequests?.map((request) => (
                        <li key={request.id} className="flex flex-wrap gap-3 justify-between items-center border-2 border-[#292139] rounded-sm bg-yellow-100 py-2 px-3">
                            <div className="flex flex-col">
                                <p className="font-bold text-lg">{request.username}</p>
                                <p className="font-light text-sm">{request.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={()=>{handleConfirm(request.id)}} className="flex items-center justify-center border w-[30px] h-[30px] rounded-sm bg-white">
                                    <img src={tick} alt="Yes" />
                                </button>
                                <button onClick={()=>{handleReject(request.id)}} className="flex items-center justify-center border w-[30px] h-[30px] rounded-sm bg-white">
                                    <img src={close} alt="No" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )
        }
        </div>
    )
}