import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
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
import ConfirmModal from "../layout/ConfirmModal"
import AchievementsModal from "./AchievementsModal"
import LanguageSwitcher from "./LanguageSwitcher"
import { CARDS_NUMBER, PUZZLES_NUMBER, PUZZLE_SETS_NUMBER } from "../../lib/constants"

export default function Profile(){
    const { t } = useTranslation()
    const {data: userPuzzleSets} = useFetch(levelsService.getUserSets)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [userData, setUserData] = useState({})
    const [userCards, setUserCards] = useState([])
    const [userPuzzles, setUserPuzzles] = useState([])
    const [completedSets, setCompletedSets] = useState(0)

    const [isPuzzlesModalOpen, setIsPuzzlesModalOpen] = useState(false)
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isAchievementModalVisible, setIsAchievementModalVisible] = useState(false)

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
                setUserCards(response.data)
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
                       <div className="flex items-start justify-between">
                            <div>
                                <div className="flex gap-3 items-center">
                                    <p className="text-2xl text-white font-bold">{userData.username}</p>
                                    <div onClick={()=>{setIsEditModalOpen(true)}}  className="flex items-center justify-center bg-[#D9D9D9] border-2 box-border border-[#292139] rounded-sm w-[30px] h-[30px]">
                                        <button className="text-xl font-semibold -mb-[3px]">✎</button>
                                    </div>
                                </div>
                                <p className="text-xl mb-2 text-white font-light">{t('profile.level')} {userData.level}</p>
                            </div>
                            <button onClick={()=>{setIsAchievementModalVisible(true)}} className="btn text-sm bg-gray-600">
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="#fce700"/>
                                </svg>
                            </button>
                        </div>
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
                        <p>{userCards.length}/{CARDS_NUMBER}</p>
                    </li>
                    <li className="flex flex-col items-center gap-2 text-lg font-semibold">
                        <div className="flex items-center justify-center w-[50px] h-[50px] border-2 rounded-md border-[#1A1C25] ">
                            <img src={puzzle} alt="Puzzles" />
                        </div>
                        <p>{userPuzzles.length}/{PUZZLES_NUMBER}</p>
                    </li>
                    <li className="flex flex-col items-center gap-2 text-lg font-semibold">
                        <div className="flex items-center justify-center w-[50px] h-[50px] border-2 rounded-md border-[#1A1C25] ">
                            <img src={puzzleSet} alt="Puzzle sets" />
                        </div>
                        <p>{completedSets}/{PUZZLE_SETS_NUMBER}</p>
                    </li>
                </ul>
            </div>
            <div className="py-[15px] px-[30px] bg-[#D9D9D9] bg-opacity-85 rounded-lg border-3 border-[#292139] h-[38vh] overflow-scroll mb-15">
                <p className="text-center font-bold text-2xl mb-5">{t('profile.cards')}:</p>
                {userCards.length > 0 ?
                (
                    <ul className="flex flex-col gap-2">
                    {userCards.map((cardData) => (
                        <li className="flex gap-4 items-center font-semibold" key={cardData.id}>
                            <img src={card} alt="Card" />
                            <p>{cardData.name} (+ {cardData.bonus_value} {getBonusString(cardData.bonus_type)})</p>
                        </li>))}
                </ul>
                )    
                :
                <p className="text-xl">{t('profile.emptyCards')}</p>
            }
            </div>
           <div className="flex flex-wrap gap-4">
            <button onClick={()=>{setIsConfirmModalOpen(true)}} className="btn bg-red-500 border-red-700 hover:bg-red-600">{t('profile.logout')}</button>
            <button onClick={()=>{setIsStatsModalOpen(true)}} className="btn bg-blue-500 border-blue-700 hover:bg-blue-600">{t('profile.stats')}</button>
           </div>
           <div className="mt-4">
            <LanguageSwitcher />
           </div>
        </div>
        <Navigation />
        {isPuzzlesModalOpen && <PuzzlesModal onClose={()=>{setIsPuzzlesModalOpen(false)}} />}
        {isStatsModalOpen && <StatsModal onClose={()=>{setIsStatsModalOpen(false)}}/>}
        {isEditModalOpen && <EditModal onClose={()=>{setIsEditModalOpen(false)}}/>}
        {isConfirmModalOpen && <ConfirmModal onClose={()=>{setIsConfirmModalOpen(false)}} message={t('profile.logoutMessage')} onConfirm={handleLogout}/>}
        {isAchievementModalVisible && <AchievementsModal onClose={()=>{setIsAchievementModalVisible(false)}}
                                        userData={userData} userCards={userCards} userPuzzles={userPuzzles} userPuzzleSets={userPuzzleSets}/>}
      </div>
    )
}