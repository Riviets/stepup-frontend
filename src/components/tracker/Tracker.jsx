import { useEffect, useState, useRef } from "react";
import Navigation from "../layout/Navigation";
import UserStats from "../layout/UserStats";
import analythics from '../../assets/analythics.svg';
import useFetch from "../hooks/useFetch";
import xp from '../../assets/xp.svg';
import tick from '../../assets/tick.svg';
import { trackerService } from '../../services/trackerService';
import MessageModal from '../layout/MessageModal';
import Analytics from "./Analythics";

export default function Tracker() {
    const date = new Date();
    const [formatedDate, setFormatedDate] = useState('');
    const { data: habitsInTracker, loading, refetch: refetchHabitsInTracker } = useFetch(trackerService.getHabitsInTracker);
    const [message, setMessage] = useState('')
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
    const [isAnalythicsVisible, setIsAnalythicsVisible] = useState(false)
    const [daiyCompletiosIds, setDailyCompletionsIds] = useState([])
    const refetchUserData = useRef(null);

    function formatDate(num) {
        if (num < 10) return `0${num}`;
        return num;
    }

    function formFormatedDateString(){
        return`${formatDate(date.getFullYear())}-${formatDate(date.getMonth() + 1)}-${formatDate(date.getDate())}`;
    }

    async function getDailyCompletions(){
        try{
            const formatedDate = formFormatedDateString()
            const response = await trackerService.getDailyCompletions(formatedDate)
            const completions = response.data
            const completionsIds = completions.map((habit)=>habit.id)
            setDailyCompletionsIds(completionsIds)
        }
        catch(error){
            setMessage(error.response?.data?.message);
            setIsMessageModalOpen(true);
        }
    }

    useEffect(()=>{
        getDailyCompletions()
    }, [])

    useEffect(() => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        setFormatedDate(`${formatDate(day)}-${formatDate(month)}-${formatDate(year)}`);
    }, [date]);

    async function handleCollectBonus() {
        try {
            const formatedDate = formFormatedDateString()
            const response = await trackerService.claimBonus(formatedDate);
            setMessage('Bonus received!');
            setIsMessageModalOpen(true);
            if (refetchUserData.current) refetchUserData.current(); 
        } catch (error) {
            setMessage(error.response?.data?.message);
            setIsMessageModalOpen(true);
        }
    }

    async function handleRemove(habitId) {
        try {
            await trackerService.removeHabitFromTracker(habitId);
            setMessage('Habit was removed from the tracker');
            setIsMessageModalOpen(true);
            refetchHabitsInTracker();
        } catch (error) {
            setMessage(error.response?.data?.message);
            setIsMessageModalOpen(true);
        }
    }

    async function handleComplete(habitId) {
        const formatedDate = formFormatedDateString()
        try {
            const response = await trackerService.completeHabit(habitId, formatedDate);
            setMessage('Habit completed');
            setIsMessageModalOpen(true);
            refetchHabitsInTracker();
            getDailyCompletions()
            if (refetchUserData.current) refetchUserData.current();
        } catch (error) {
            setMessage(error.response?.data?.message);
            setIsMessageModalOpen(true);
        }
    }

    return (
        <div className="pt-[50px] pb-[150px]">
            <UserStats className='mb-[40px]' refetchUserData={refetchUserData} />
            <div className="max-w-[370px] bg-[#D9D9D9] mx-auto border-2 border-[#483D61] rounded-lg">
                <div className="py-3 border-b-2">
                    <p className="text-center">{formatedDate}</p>
                </div>
                <div className="py-[35px] px-[20px]">
                    <div className="flex justify-between items-center mb-[30px] mx-auto max-w-[270px]">
                        <p className="text-2xl font-black">Daily tracker</p>
                        <button onClick={()=>{setIsAnalythicsVisible(true)}} to='/tracker/analythics' className="flex items-center gap-1 bg-yellow-100 px-2 py-1 border-1 rounded-full max-h-[25px] -mr-3">
                            <img src={analythics} alt="Graph" className="min-w-[10px]" />
                            <p className="text-sm">Analytics</p>
                        </button>
                    </div>
                    <div className="max-h-[290px] overflow-scroll px-2">
                        {loading ? (
                            <p>Loading ...</p>
                        ) : habitsInTracker && habitsInTracker.length > 0 ? (
                            <ul className="flex flex-col gap-5">
                                {habitsInTracker.map((habit) => (
                                    <li
                                        key={habit.id}
                                        className={`flex items-center border border-[#563897] rounded-lg pl-[15px] pr-[25px] py-3
                                            ${daiyCompletiosIds.includes(habit.id) ? 'bg-gray-400' : 'bg-white'}
                                            `}
                                    >
                                        <div className="stats mr-[15px]">
                                            <p className="text-sm">+{habit.xp}</p>
                                            <img src={xp} alt="XP" className="max-w-[20px] -mb-[2px]" />
                                        </div>
                                        <p className="text-lg mr-auto">{habit.name}</p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleRemove(habit.id)}
                                                className="flex items-center justify-center font-black bg-yellow-100 w-[25px] h-[25px] border border-[#563897] rounded-sm"
                                            >
                                                <p className="-mb-[2px] text-2xl font-black">−</p>
                                            </button>
                                            <button
                                                onClick={() => handleComplete(habit.id)}
                                                className="flex items-center justify-center font-black bg-yellow-100 w-[25px] h-[25px] border border-[#563897] rounded-sm"
                                            >
                                                <img src={tick} alt="Done" className="min-w-[20px]" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-lg font-medium py-10">So Empty Here...</p>
                        )}
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={handleCollectBonus}
                            className="border-1 border-[#483D61] px-[30px] rounded-md bg-[#FFCE68] text-white tracking-wider font-bold [text-shadow:0px_1px_3px_black] mt-5 text-lg"
                        >
                            COLLECT BONUS
                        </button>
                    </div>
                </div>
            </div>
            <Navigation />
            {isMessageModalOpen && <MessageModal message={message} onClose={() => setIsMessageModalOpen(false)} />}
            {isAnalythicsVisible && <Analytics onClose={()=>{setIsAnalythicsVisible(false)}}/>}
        </div>
    );
}