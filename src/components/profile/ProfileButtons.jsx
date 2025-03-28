import { useTranslation } from "react-i18next"

export default function ProfileButtons({handleLogout, handleStats}){
    const { t } = useTranslation()

    return(
        <div className="flex flex-wrap gap-4">
            <button onClick={handleLogout} className="btn bg-red-500 border-red-700 hover:bg-red-600">{t('profile.logout')}</button>
            <button onClick={handleStats} className="btn bg-blue-500 border-blue-700 hover:bg-blue-600">{t('profile.stats')}</button>
        </div>
    )
}