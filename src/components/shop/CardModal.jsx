import useFetch from "../hooks/useFetch"
import { shopService } from "../../services/shopService"
import card2 from '../../assets/card-2.svg'
import coins from '../../assets/coins.svg'
import close from '../../assets/close.svg'
import { useState, useEffect } from "react"

export default function CardModal({cardId, onConfirm, onClose}){

    const [cardData, setCardData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        try{
            setIsLoading(true)
            // const response = await shopService.
        }
        catch(error){
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
    }, [])

    function getBonusString(type){
        if(type === 'xp_per_habit') return 'XP per completed habit'
        if(type === 'currency_per_habit') return 'currency per completed habit'
        if(type === 'xp_per_bonus') return 'XP per daily bonus'
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-[40%] bg-opacity-40 fixed inset-0">
            <div className="flex flex-col items-center p-[25px] pt-[60px] pb-[45px] min-w-[250px] min-h-[350px] bg-white rounded-md shadow-lg relative">
                <p className="text-2xl max-w-[225px] text-center mb-[30px] font-bold">Would you like to buy this card?</p>
                <img src={card2} alt="Card" className="min-w-[150px] mb-8"/>
                <p className="max-w-[275px] text-center mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, reiciendis?</p>
                <button className="flex gap-2 items-center bg-[#FFFAA3] px-8 border-2 border-[#563897] rounded-full shadow-xl">
                    <p className="text-xl font-black">150</p>
                    {/* {cardData.price} */}
                    <img src={coins} alt="Coins" />
                </button>
                {/* <p>+ {cardData.bonus_value} {getBonusString(cardData.bonus_type)}</p> */}
                <button onClick={onClose} className="absolute top-[20px] right-[25px]">
                    <img src={close} alt="Close" className="min-w-[20px]"/>
                </button>
            </div>
        </div>
    )
}