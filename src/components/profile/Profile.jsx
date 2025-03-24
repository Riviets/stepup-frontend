import { useEffect, useState } from "react"
import Navigation from "../layout/Navigation"
import { authService } from "../../services/authService"
import xp from '../../assets/xp.png'
import coins from '../../assets/coins.svg'
import pfp from '../../assets/pfp-default.png'
import card from '../../assets/card.png'
import puzzle from '../../assets/puzzle.png'
import puzzleSet from '../../assets/puzzle-set.png'
import { shopService } from "../../services/shopService"
import { levelsService } from "../../services/levelsService"
import Spinner from "../layout/Spinner"
import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import PuzzlesModal from "./PuzzlesModal"
import StatsModal from "./StatsModal"
import EditModal from "./EditModal"

export default function Profile(){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [userData, setUserData] = useState({})
    const [userCars, setUserCars] = useState([])
    const [userPuzzles, setUserPuzzles] = useState([])
    const {data: userPuzzleSets} = useFetch(levelsService.getUserSets)
    const [completedSets, setCompletedSets] = useState(0)
    const [isPuzzlesModalOpen, setIsPuzzlesModalOpen] = useState(false)
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(userPuzzleSets){
            let completedSets = 0
            for(let set of userPuzzleSets){
                if(set.collected === 4){
                    completedSets+=1
                }
            }   
            setCompletedSets(completedSets)         
        }
    }, [userPuzzleSets])

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

    useEffect(()=>{
        async function getUserCards(){
            try{
                setIsLoading(true)
                const response = await shopService.getUserCards()
                setUserCars(response.data)
            }
            catch(err){
                setError(err)
            }
            finally{
                setIsLoading(false)
            }
        }
        getUserCards()
    }, [])

    useEffect(()=>{
        async function getUserPuzzles(){
            try{
                setIsLoading(true)
                const response = await levelsService.getUserPuzzles()
                setUserPuzzles(response.data)
            }
            catch(err){
                setError(err)
            }
            finally{
                setIsLoading(false)
            }
        }
        getUserPuzzles()
    }, [])

    function handleOpenPuzzlesModal(){
        setIsPuzzlesModalOpen(true)
    }
    
    function getBonusString(bonusType){
        if(bonusType === 'xp_per_habit') {
            return 'XP per habit'
        }
        else if(bonusType === 'currency_per_habit'){
            return 'coins per habit'
        }
        else if(bonusType === 'xp_per_bonus'){
            return 'XP for daily bonus'
        }
    }

    function handleLogout(){
        authService.logoutUser()
        navigate('/login')
    }

    if(isLoading) return <div className="flex min-h-screen items-center justify-center"><Spinner /></div>
    if(error) return <div>{error.message}</div>

    return(
      <div>
         <div className="pt-[50px] pb-[150px] max-w-[330px] mx-auto">
            <div className="flex gap-7 items-start mb-8">
                    <img className="border-3 border-[#292139] rounded-lg min-h-full pfp" src={pfp} alt="User pfp" />
                    <div>
                        <div className="flex gap-3 items-center">
                            <p className="text-2xl text-white font-bold">{userData.username}</p>
                            <div onClick={()=>{setIsEditModalOpen(true)}}  className="flex items-center justify-center bg-[#D9D9D9] border-2 box-border border-[#292139] rounded-sm w-[30px] h-[30px]">
                                <button className="text-xl font-semibold -mb-[3px]">✎</button>
                            </div>
                        </div>
                        <p className="text-xl mb-2 text-white font-light">Level {userData.level}</p>
                        <div className="flex justify-between max-h-[32px] px-[20px] font-black border rounded-md min-w-[200px] bg-gray-300 text-lg">
                            <div className="flex items-center gap-2">
                                <p>{userData.xp}</p>
                                <img className="min-w-[25px]" src={xp} alt="xp"/>
                            </div>
                           <div className="flex items-center">
                                <p>{userData.currency}</p>
                                <img className="w-full max-w-[30px]" src={coins} alt="coins" />
                           </div>
                        </div>
                    </div>
            </div>
            <div className="py-[15px] px-[30px] bg-[#D9D9D9] bg-opacity-85 rounded-lg border-3 border-[#292139] mb-[25px]">
                <ul onClick={handleOpenPuzzlesModal} className="flex justify-between items-center">
                    <li className="flex flex-col items-center gap-2 text-lg font-semibold">
                        <div className="flex items-center justify-center w-[50px] h-[50px] border-2 rounded-md border-[#1A1C25] ">
                            <img src={card} alt="Cards" />
                        </div>
                        <p>{userCars.length}/10</p>
                    </li>
                    <li className="flex flex-col items-center gap-2 text-lg font-semibold">
                        <div className="flex items-center justify-center w-[50px] h-[50px] border-2 rounded-md border-[#1A1C25] ">
                            <img src={puzzle} alt="Puzzles" />
                        </div>
                        <p>{userPuzzles.length}/16</p>
                    </li>
                    <li className="flex flex-col items-center gap-2 text-lg font-semibold">
                        <div className="flex items-center justify-center w-[50px] h-[50px] border-2 rounded-md border-[#1A1C25] ">
                            <img src={puzzleSet} alt="Puzzle sets" />
                        </div>
                        <p>{completedSets}/4</p>
                    </li>
                </ul>
            </div>
            <div className="py-[15px] px-[30px] bg-[#D9D9D9] bg-opacity-85 rounded-lg border-3 border-[#292139] h-[38vh] overflow-scroll mb-10">
                <p className="text-center font-bold text-2xl mb-5">Your cards:</p>
                {userCars.length > 0 ?
                (
                    <ul className="flex flex-col gap-2">
                    {userCars.map((cardData) => (
                        <li className="flex gap-4 items-center font-semibold" key={cardData.id}>
                            <img src={card} alt="Card" />
                            <p>{cardData.name} (+ {cardData.bonus_value} {getBonusString(cardData.bonus_type)})</p>
                        </li>))}
                </ul>
                )    
                :
                <p className="text-xl">So Empty Here...</p>
            }
            </div>
           <div className="flex gap-8">
            <button onClick={handleLogout} className="btn bg-red-500 border-red-700 hover:bg-red-600">Log out</button>
            <button onClick={()=>{setIsStatsModalOpen(true)}} className="btn bg-blue-500 border-blue-700 hover:bg-blue-600">Stats</button>
           </div>
        </div>
        <Navigation />
        {isPuzzlesModalOpen && <PuzzlesModal onClose={()=>{setIsPuzzlesModalOpen(false)}} />}
        {isStatsModalOpen && <StatsModal onClose={()=>{setIsStatsModalOpen(false)}}/>}
        {isEditModalOpen && <EditModal onClose={()=>{setIsEditModalOpen(false)}}/>}
      </div>
    )
}