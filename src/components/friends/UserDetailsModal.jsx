import close from "../../assets/close.svg"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { getAvatarUrl } from "../../lib/utils"

export default function UserDetailsModal({userData, onClose}){

    const { t } = useTranslation()
    const avatarUrl = getAvatarUrl(userData)

    return(
        <div className="flex justify-center items-center fixed inset-0 z-10" style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
            <div className="w-full max-w-[370px] bg-white rounded-md border-2 border-[#292139] relative py-10 px-5">
                <div className="flex items-center gap-5 mb-8">
                    <img className="border-2 border-[#292139] rounded-md max-w-[75px]" src={avatarUrl} alt="" />
                    <div>
                        <p className="font-bold text-2xl">{userData.username}</p>
                        <p>{userData.email}</p>
                    </div>
                </div>
                <button onClick={onClose} className="w-full py-1 bg-purple-800 text-white font-bold tracking-wider text-xl rounded-md">
                    {t('friends.close')}
                </button>
                <button onClick={onClose} className="absolute top-5 right-7">
                    <img src={close} alt={t('suggestHabitModal.closeAlt')} className="min-w-[15px]" />
                </button>
            </div>
        </div>
    )
}