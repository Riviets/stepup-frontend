import { useEffect, useState } from "react";
import close from "../../assets/close.svg";
import {habitsService} from "../../services/habitsService"
import useFetch from "../hooks/useFetch";
import { Dropdown, DropdownItem } from "../utils/Dropdown";

export default function SuggestHabitModal({onClose, friendName}){

    const {data: customHabits, isLoading} = useFetch(habitsService.getUserHabits)
    const [selectedHabitId, setSelectedHabitId] = useState(null)
    const [isSent, setIsSent] = useState(false)

    const handleSend = () => {
        setIsSent(true)
    }

    const handleSelect = (habitId) => {
        setSelectedHabitId(habitId)
    }

    useEffect(()=>{
        if(selectedHabitId){
            console.log(selectedHabitId);
        }
    }, [selectedHabitId])

    return(
        <div className="flex items-center justify-center fixed inset-0 z-10" style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
            <div className="bg-[#D9D9D9] rounded-md border-2 border-[#292139] w-full max-w-[370px] h-[300px] relative pb-10 pt-15 px-5 relative">
                <p className="font-bold mb-5 text-2xl max-w-[300px] mx-auto text-center">Suggest {friendName} a habit</p>
               <div className="absolute z-10 w-full max-w-[325px]">
                <Dropdown trigger={
                        <button className="w-full py-3 bg-white text-xl rounded-md font-bold">Select a habit</button>
                    } isSent={isSent} handleSelect={handleSelect}>
                        {customHabits?.map((habit)=>(
                            <DropdownItem key={habit.id} value={habit.name}>
                                {habit}
                            </DropdownItem>
                        ))}
                    </Dropdown>
               </div>
               <div onClick={handleSend} className="flex justify-center">
                    <button className="w-full text-center bg-purple-700 border-2 border-purple-900 text-white font-bold tracking-widest text-xl py-2 rounded-md absolute bottom-5 max-w-[200px]">Send</button>
               </div>
                <button onClick={onClose} className="absolute top-5 right-7">
                    <img src={close} alt="Close Edit Modal" className="min-w-[15px]" />
                </button>
            </div>
        </div>
    )
}