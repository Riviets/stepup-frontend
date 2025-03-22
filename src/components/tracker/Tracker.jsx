import { useEffect, useState } from "react"
import Navigation from "../layout/Navigation"
import UserStats from "../layout/UserStats"
import analythics from '../../assets/analythics.svg'
import useFetch from "../hooks/useFetch"
import xp from '../../assets/xp.svg'
import tick from '../../assets/tick.svg'
import {trackerService} from '../../services/trackerService'
import MessageModal from '../layout/MessageModal'

export default function Tracker(){
    const date = new Date
    const [formatedDate, setFormatedDate] = useState('')
    const {data: habitsInTracker, refetch: refetchHabitsInTracker} = useFetch(trackerService.getHabitsInTracker)
    const [message, setMessage] = useState('')
    const [isMessageModalOpen, setIsMessageModalOpen]= useState(false)
    // const [completedHabits, setCompletedHabits] = useState([])

    // useEffect(()=>{
    //     async function getCompletedHabits(){
    //         console.log(formatedDate);
    //         try{
    //             if(formatedDate){
    //                 const response = await trackerService.getDailyCompletions(formatedDate)
    //                 console.log(response.data);
    //             }
                
    //         }
    //         catch(error){
    //             console.log(error);
                
    //         }
    //     }
    //     getCompletedHabits
    // }, [formatedDate])

    function formatDate(num){
        if(num<10) return `0${num}`
        return num
    }

    useEffect(()=>{
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        setFormatedDate(`${formatDate(day)}-${formatDate(month)}-${formatDate(year)}`);
    }, [date])

    async function handleRemove(habitId){
        try{
            await trackerService.removeHabitFromTracker(habitId)
            setMessage('Habit was removed from the tracker')
            setIsMessageModalOpen(true)
            refetchHabitsInTracker()
        }
        catch(error){
            console.log(error)
        }
    }

    async function handleComplete(habitId){
        const formatedDate = `${formatDate(date.getFullYear())}-${formatDate(date.getMonth()+1)}-${formatDate(date.getDate())}`
        console.log(formatedDate)
        console.log(`Complete ${habitId}`)
        try{
            const response = await trackerService.completeHabit(habitId, formatedDate)
            setMessage('Habit completed')
            setIsMessageModalOpen(true)
            refetchHabitsInTracker()
        }
        catch(error){
            console.log(error)
            setMessage('Habit has already been completed')
            setIsMessageModalOpen(true)
        }
    }

    return(
        <div className="pt-[50px] pb-[150px]">
            <UserStats className='mb-[40px]' />
            <div className="max-w-[350px] bg-[#D9D9D9] mx-auto border-2 border-[#483D61] rounded-lg">
                <div className="py-3 border-b-2">
                    <p className="text-center">{formatedDate}</p>
                </div>
                <div className="py-[35px] px-[20px] min-h-[450px]">
                    <div className="flex justify-between items-center mb-[30px] mx-auto max-w-[270px]">
                        <p className="text-2xl font-black">Daily tracker</p>
                        <button className="flex items-center gap-1 bg-yellow-100 px-2 py-1 border-1 rounded-full max-h-[25px] -mr-3">
                            <img src={analythics} alt="Graph" className="min-w-[10px]"/>
                            <p className="text-sm">Analytics</p>
                        </button>
                    </div>
                    <div className="overflow-scroll">
                        {habitsInTracker ? 
                        <ul className="flex flex-col gap-5">
                            {habitsInTracker?.map((habit) => (
                                <li key={habit.id} className="flex items-center bg-white border border-[#563897] rounded-lg pl-[15px] pr-[25px] py-3">
                                    <div className="stats mr-[15px]">
                                        <p className="text-sm">+{habit.xp}</p>
                                        <img src={xp} alt="XP" className="max-w-[20px] -mb-[2px]" />
                                    </div>
                                    <p className="text-lg mr-auto">
                                        {habit.name}
                                    </p>
                                    <div className="flex gap-3">
                                        <button onClick={()=>{handleRemove(habit.id)}} className="flex items-center justify-center font-black bg-yellow-100 w-[25px] h-[25px] border border-[#563897] rounded-sm">
                                            <p className="-mb-[2px] text-2xl font-black">
                                                &#8722;
                                            </p>
                                        </button>
                                        <button onClick={(()=>{handleComplete(habit.id)})} className="flex items-center justify-center font-black bg-yellow-100 w-[25px] h-[25px] border border-[#563897] rounded-sm">
                                            <img src={tick} alt="Done" className="min-w-[20px]"/>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>   :
                        <p>Loading ...</p>
                    }
                    </div>
                </div>
            </div>
            <Navigation />
            {isMessageModalOpen && <MessageModal message={message} onClose={()=>{setIsMessageModalOpen(false)}}/>}
        </div>
    )
}