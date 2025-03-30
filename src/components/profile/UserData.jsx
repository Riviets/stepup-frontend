import xp from '../../assets/xp.png'
import coins from '../../assets/coins.svg'
import pfp from '../../assets/pfp-default.png'
import { useTranslation } from "react-i18next"

export default function UserData({userData, handleOpenAchievementModal, handleOpenEditModal}){

    const { t } = useTranslation()
        

    return(
        <div className="flex gap-7 items-start mb-8">
        <img className="border-3 border-[#292139] rounded-lg min-h-full pfp" src={pfp} alt="User pfp" />
        <div>
        <div className="flex items-start justify-between">
                <div>
                    <div className="flex gap-3 items-center">
                        <p className="text-2xl text-white font-bold">{userData?.username}</p>
                        <div onClick={handleOpenEditModal}  className="flex items-center justify-center bg-[#D9D9D9] border-2 box-border border-[#292139] rounded-sm w-[30px] h-[30px]">
                            <button className="text-xl font-semibold -mb-[3px]">✎</button>
                        </div>
                    </div>
                    <p className="text-xl mb-2 text-white font-light">{t('profile.level')} {userData?.level}</p>
                </div>
                <button onClick={handleOpenAchievementModal} className="btn text-sm bg-gray-600">
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="#fce700"/>
                    </svg>
                </button>
            </div>
            <div className="flex justify-between max-h-[32px] px-[20px] font-black border rounded-md min-w-[200px] bg-gray-300 text-lg">
                <div className="flex items-center gap-2">
                    <p>{userData?.xp}</p>
                    <img className="min-w-[25px]" src={xp} alt="xp"/>
                </div>
            <div className="flex items-center">
                    <p>{userData?.currency}</p>
                    <img className="w-full max-w-[30px]" src={coins} alt="coins" />
            </div>
            </div>
        </div>
    </div>
    )
}