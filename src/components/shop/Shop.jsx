import Navigation from "../Navigation"
import Spinner from "../Spinner"
import UserStats from "../UserStats"
import deck from '../../assets/deck.png'
import useFetch from "../hooks/useFetch"
import card2 from '../../assets/card-2.svg'
import { shopService } from "../../services/shopService"
import CardModal from "./CardModal"
import coins from '../../assets/coins.svg'
import { useState } from "react"

export default function Shop(){

    const {data: cardsData, isLoading, error} = useFetch(shopService.getCards)
    const [isModalOpen, setIsModalOpen] = useState(false)


    function handleConfirm(){
        setIsModalOpen(false)
    }

    function handleCancel(){
        setIsModalOpen(false)
    }

    if(isLoading) return (<div className="flex justify-center items-center min-h-screen"><Spinner /></div>)
    if(error) return (<div className="flex justify-center items-center min-h-screen text-red-500">Error: {error.message}</div>)
    
    return(
        <div className="pt-[50px] pb-[150px]">
            <UserStats />
            <div className="max-w-[350px] mx-auto">
                <h2 className="text-3xl font-bold text-white mb-[30px] tracking-wider">Shop</h2>
                <div className="border-2 border-[#292139] rounded-md bg-[#D9D9D9] py-[45px] px-[20px]">
                    <div className="flex gap-5 mb-[35px]">
                        <div className="flex gap-3 items-center text-2xl font-bold mr-[30px] px-5">
                            <p>Cards</p>
                            <img src={deck} alt="Cards" className="min-w-[20px]"/>
                        </div>
                        <p className="text-sm">Each owned card gives you a bonus</p>
                    </div>
                    <div className="w-[150px] h-[5px] bg-[#292139] mx-auto rounded-full blur-[3px] mb-10"></div>
                    <ul className="flex flex-wrap justify-between max-w-[280px] mx-auto gap-5 justify-center">
                        {cardsData?.map((card)=>(
                            <li key={card.id} onClick={()=> {setIsModalOpen(true)}} className="flex flex-col items-center justify-between border-1 border-[#483D61] w-[120px] h-[175px] rounded-md
                                                         px-[15px] py-[15px] shadow-lg bg-white">
                                <img src={card2} alt="Card" className="max-w-[40px]"/>
                                <p className="text-center font-medium">{card.name} </p>
                                    <div className="flex items-center border justify-center bg-[#FFFAA3] px-5 max-w-[60px] rounded-full mx-auto">
                                        {card.price}
                                        <img src={coins} alt="Coins" />
                                    </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Navigation />
            {isModalOpen && <CardModal onConfirm={handleConfirm} onClose={handleCancel}/>}
        </div>
    )
}