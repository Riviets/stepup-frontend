export default function FriendsList({friends}){
    return(
        <div>
            {friends?.length === 0 ? 
                    <p className="text-xl text-center font-bold">No friends</p> :
                    <ul className="flex flex-col gap-5 max-h-[300px] overflow-scroll">
                        {friends?.map((friend)=>(
                            <li key={friend.id} className="flex flex-col gap-5 bg-white px-5 py-4 border border-[#292139] rounded-md shadow-md">
                               <div className="flex justify-between gap-3 flex-wrap w-full items-center">
                                    <div className="flex flex-col">
                                        <p className="text-xl font-bold">{friend.username}</p>
                                        <p className="text-sm">{friend.email}</p>
                                    </div>
                                    <div className="habit-btn">
                                        <button className="text-2xl font-bold -mt-[3px]">-</button>
                                    </div>
                               </div>
                               <button className="bg-purple-700 text-white font-bold text-lg tracking-wider border border-[#292139] rounded-md shadow-lg"> 
                                    Propose habit
                               </button>
                            </li>
                        ))}
                    </ul>
                    }
        </div>
    )
}