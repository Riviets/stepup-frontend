import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Navigation from "../layout/Navigation"
import { Link } from "react-router-dom"
import { authService } from "../../services/authService"
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
import UserData from "./UserData"
import UserStats from "./UserStats"
import UserCards from "./UserCards"
import ProfileButtons from "./ProfileButtons"

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

    function handleLogout(){
        authService.logoutUser()
        navigate('/login')
    }

    if(isLoading) return <div className="flex min-h-screen items-center justify-center"><Spinner /></div>
    if(error) return <div>{error.message}</div>

    return(
      <div>
         <div className="pt-[50px] pb-[150px] max-w-[330px] mx-auto">
            <UserData userData={userData} handleOpenAchievementModal={()=>{setIsAchievementModalVisible(true)}}
                        handleOpenEditModal={()=>{setIsEditModalOpen(true)}}/>
            <UserStats userCards={userCards} userPuzzles={userPuzzles}
                        completedSets={completedSets} handleOpenPuzzlesModal={()=>{setIsPuzzlesModalOpen(true)}}/>
            <Link to={'/friends'} className="flex items-center justify-center gap-3 bg-[#D9D9D9] mb-6 rounded-md border-2 border-[#292139] py-1 text-xl font-bold tracking-wider">
                <p>Friends</p>
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 7C7.93438 7 9.5 5.43438 9.5 3.5C9.5 1.56562 7.93438 0 6 0C4.06562 0 2.5 1.56562 2.5 3.5C2.5 5.43438 4.06562 7 6 7ZM8.4 8H8.14062C7.49063 8.3125 6.76875 8.5 6 8.5C5.23125 8.5 4.5125 8.3125 3.85938 8H3.6C1.6125 8 0 9.6125 0 11.6V12.5C0 13.3281 0.671875 14 1.5 14H10.5C11.3281 14 12 13.3281 12 12.5V11.6C12 9.6125 10.3875 8 8.4 8ZM15 7C16.6562 7 18 5.65625 18 4C18 2.34375 16.6562 1 15 1C13.3438 1 12 2.34375 12 4C12 5.65625 13.3438 7 15 7ZM16.5 8H16.3813C15.9469 8.15 15.4875 8.25 15 8.25C14.5125 8.25 14.0531 8.15 13.6187 8H13.5C12.8625 8 12.275 8.18437 11.7594 8.48125C12.5219 9.30312 13 10.3938 13 11.6V12.8C13 12.8688 12.9844 12.9344 12.9812 13H18.5C19.3281 13 20 12.3281 20 11.5C20 9.56562 18.4344 8 16.5 8Z" fill="black"/>
                </svg>
            </Link>
            <UserCards userCards={userCards}/>
           <ProfileButtons handleLogout={()=>{setIsConfirmModalOpen(true)}} handleStats={()=>{setIsStatsModalOpen(true)}}/>
           
            <LanguageSwitcher />
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