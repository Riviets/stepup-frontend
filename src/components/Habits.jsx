import Navigation from "./Navigation"
import UserStats from "./UserStats"
import useFetch from "./hooks/useFetch"
import Spinner from "./Spinner"
import xp from '../assets/xp.png'
import coins from '../assets/coins.png'
import { habitsService } from "../services/habitsService"
import { useState, useEffect } from "react"
import arrow from '../assets/arrow-bottom.png'

export default function Habits(){
    const [defaultHabits, setDefaultHabits] = useState([])
    const [defaultHabitsLoading, setDefaultHabitsLoading] = useState(false)
    const [defaultHabitsError, setDefaultHabitsError] = useState(null)
    const [defaultHabitsVisible, setDefaultHabitsVisible] = useState(false)
    const [userHabits, setUserHabits] = useState([])
    const [userHabitsLoading, setUserHabitsLoading] = useState(false)
    const [userHabitsError, setUserHabitsError] = useState(null)
    const [userHabitsVisible, setUserHabitsVisible] = useState(false)

    useEffect(()=>{
        async function loadDefaultHabits(){
            try{
                setDefaultHabitsLoading(true)
                const response = await habitsService.getDefaultHabits()
                console.log(response.data)
                setDefaultHabits(response.data)
            }
            catch(error){
                setDefaultHabitsError(error)
            }
            finally{
                setDefaultHabitsLoading(false)
            }
        }
        loadDefaultHabits()
    }, [])

    useEffect(()=>{
        async function loadDefaultHabits(){
            try{
                setUserHabitsLoading(true)
                const response = await habitsService.getUserHabits()
                console.log(response.data)
                setUserHabits(response.data)
            }
            catch(error){
                setUserHabitsError(error)
            }
            finally{
                setUserHabitsLoading(false)
            }
        }
        loadDefaultHabits()
    }, [])

    if(defaultHabitsLoading || userHabitsLoading) return <div className="flex min-x-screen items-center justify-center"><Spinner /></div>
    if (defaultHabitsError) return <div>{defaultHabitsError.message}</div>
    if (userHabitsError) return <div>{userHabitsError.message}</div>


    return(
        <div className="py-10 pb-[170px] min-h-screen">
            <UserStats />
            <div className=" max-w-[350px] mx-auto border-3 border-[#483D61] rounded-md bg-[#D9D9D9] mb-10">
                <div onClick={()=>{setDefaultHabitsVisible(!defaultHabitsVisible)}} className="flex justify-between items-center px-[25px] py-[10px] text-xl font-bold">
                    <p>Default</p>
                    <img src={arrow} alt="Show/Hide" />
                </div>
                {defaultHabitsVisible &&
                <ul className="flex flex-col gap-7 px-[25px] pb-[30px] pt-5 border-t-3">
                    {defaultHabits.map((habit)=>(
                        <li key={habit.id} className="flex items-start gap-6">
                           <div className="habit-btn">
                            <button className="font-bold text-xl">&#x002B;</button>
                           </div>
                            <div className="flex justify-between flex-1 gap-2 mr-auto">
                                <p className="text-lg font-medium">{habit.name}</p>
                                <div className="flex gap-2 items-center max-w-[130px] justify-between">
                                    <div className="stats">+{habit.xp}
                                          <img className="min-w-[30px]" src={xp} alt="xp"/>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>}
            </div>
            <div className=" max-w-[350px] mx-auto border-3 border-[#483D61] rounded-md bg-[#D9D9D9]">
                <div onClick={()=>{setUserHabitsVisible(!userHabitsVisible)}} className="flex justify-between items-center px-[25px] py-[10px] text-xl font-bold">
                    <p>Custom</p>
                    <img src={arrow} alt="Show/Hide" />
                </div>
                {userHabitsVisible &&
                <ul className="flex flex-col gap-7 px-[25px] pb-[30px] pt-5 border-t-3">
                    {userHabits.length === 0 ? <p className="text-xl font-semibold text-center">So empty here...</p> : 
                        userHabits.map((habit)=>(
                            <li key={habit.id} className="flex items-start gap-6">
                               <div className="habit-btn">
                                <button className="font-bold text-xl">&#x002B;</button>
                               </div>
                                <div className="flex flex-col gap-2 mr-auto">
                                    <p className="text-lg font-medium">{habit.name}</p>
                                    <div className="flex gap-2 items-center max-w-[130px] justify-between">
                                        <div className="stats">+{habit.xp}
                                              <img className="min-w-[30px]" src={xp} alt="xp"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                   <div className="habit-btn">
                                        <button>&#x270E;</button>
                                   </div>
                                    <div className="habit-btn">
                                        <button>&#128465;</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                    
                </ul>}
            </div>
            <Navigation />
        </div>
    )
}