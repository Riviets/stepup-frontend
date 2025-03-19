import Navigation from "./Navigation"
import Slider from 'react-slick'
import UserStats from "./UserStats";
import useFetch from "./hooks/useFetch";
import puzzle from '../assets/puzzle.svg'
import coins from '../assets/coins.svg'
import { levelsService } from "../services/levelsService";
import { authService } from "../services/authService"; 
import Spinner from "./Spinner";
import { useState, useEffect, useRef } from "react";
import MessageModal from "./MessageModal";

export default function Levels(){
    const {data: levels, isLoading, error, refetch} = useFetch(levelsService.getAllLevels)
    const {data: userData, isLoading: userLoading, refetch: refetchUser} = useFetch(authService.getCurrentUser) 
    const [modalMessage, setModalMessage] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [completingLevel, setCompletingLevel] = useState(false)
    const sliderRef = useRef()

useEffect(() => {
    if (!isLoading && !userLoading && userData && levels && sliderRef.current) {
        const nextLevelIndex = userData.level
        
        setTimeout(() => {
            if (sliderRef.current && sliderRef.current.slickGoTo) {
                sliderRef.current.slickGoTo(nextLevelIndex);
            }
        }, 500); 
    }
}, [isLoading, userLoading, userData, levels]);

    async function handleComplete(levelId){
        setCompletingLevel(true)
        try{
            const response = await levelsService.unlockLevel(levelId)            
            if(response.data.success === false) {
                setModalMessage(response.data.message)
                setShowModal(true)
            } else {
                let successMessage = `Рівень ${levelId} виконано! Отримано ${response.data.reward_currency || 0} монет.`
                
                if(response.data.setCompleted) {
                    successMessage += ` Ви зібрали повний набір "${response.data.setCompleted.name}" і отримали бонус +${response.data.setCompleted.bonus_value} XP за звичку!`
                }
                
                setModalMessage(successMessage)
                setShowModal(true)
                refetch()
                refetchUser() 
            }
        }
        catch(error){
            setModalMessage(error.response?.data?.message || "Помилка з'єднання з сервером")
            setShowModal(true)
        }
        finally {
            setCompletingLevel(false)
        }
    }

    const closeModal = () => {
        setShowModal(false)
        setModalMessage(null)
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    if(isLoading || userLoading) return (<div className="flex justify-center items-center"><Spinner /></div>)
    if(error) return (<div className="flex justify-center items-center">{error.message}</div>)    

    return(
        <div className="pt-[50px]">
            {showModal && <MessageModal message={modalMessage} onClose={closeModal} />}
            
            <UserStats />
            <div className="flex min-h-screen">
                <div className="slider-container max-w-[300px] mx-auto pt-[40px]">
                    <Slider ref={sliderRef} {...settings}>
                        {levels?.map((level)=>{
                            const isCompleted = userData?.level >= level.id;
                            
                            return (
                                <div key={level.id} className="flex flex-col gap-3 relative color-[#292139] bg-white rounded-lg w-[200px] min-h-[200px] p-[30px]">
                                  <div className="mx-auto text-center mb-[20px] border-2 rounded-full max-w-max px-[30px] py-[25px] shadow-lg bg-white -mt-[20px]">
                                    <p className="text-5xl font-black">{level.id}</p>
                                    <p className="text-2xl font-black tracking-widest">Level</p>
                                  </div>
                                  <div className="flex items-center justify-center gap-7 mb-5">
                                    {level.puzzle_id !== null &&
                                        <div className="flex flex-col items-center gap-1 font-bold text-xl">
                                        <img src={puzzle} alt="Puzzle" className="min-w-[75px] rotate-20"/>
                                        +1
                                    </div>
                                    }
                                    <div className="flex flex-col items-center gap-1 font-bold text-xl">
                                        <img src={coins} alt="Puzzle" className="min-w-[75px]"/>
                                        +{level.reward_currency}
                                    </div>
                                  </div>
                                  {isCompleted ? (
                                    <button 
                                      className="bg-gray-500 w-full text-white font-black tracking-widest text-xl border-2 border-gray-700 rounded-lg shadow-lg cursor-default"
                                      disabled
                                    >
                                      Completed
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={()=> handleComplete(level.id)} 
                                      className="bg-[#563897] w-full text-white font-black tracking-widest text-xl border-2 border-[#483D61] rounded-lg shadow-lg disabled:opacity-50"
                                      disabled={completingLevel}
                                    >
                                      {completingLevel ? 'Завантаження...' : 'Complete'}
                                    </button>
                                  )}
                                  <p className="absolute top-3 font-bold right-3 border-b-2">{level.xp_required} XP</p>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
            <Navigation />
        </div>
    )
}