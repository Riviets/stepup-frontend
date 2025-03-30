import card from '../../assets/card.png'
import { useTranslation } from "react-i18next"

export default function UserCards({userCards}){
    const { t } = useTranslation()

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
    
    
    return(
            <div className="py-[15px] px-[30px] bg-[#D9D9D9] bg-opacity-85 rounded-lg border-3 border-[#292139] h-[38vh] overflow-scroll mb-8">
                <p className="text-center font-bold text-2xl mb-5">{t('profile.cards')}:</p>
                {userCards?.length > 0 ?
                (
                    <ul className="flex flex-col gap-2">
                    {userCards?.map((cardData) => (
                        <li className="flex gap-4 items-center font-semibold" key={cardData?.id}>
                            <img src={card} alt="Card" />
                            <p>{cardData?.name} (+ {cardData?.bonus_value} {getBonusString(cardData?.bonus_type)})</p>
                        </li>))}
                </ul>
                )    
                :
                <p className="text-xl">{t('profile.emptyCards')}</p>
            }
        </div>
    )
}