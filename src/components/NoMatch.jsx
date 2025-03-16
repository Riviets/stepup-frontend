import { useNavigate } from "react-router-dom"

export default function NoMatch(){
    const navigate = useNavigate()

    return(
       <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col gap-7">
                <p className="font-bold text-3xl">Nothing to do here!</p>
                <button onClick={()=>navigate(-1)} className="text-xl border-2 rounded-lg py-2 cursor-pointer bg-gray-300 hover:bg-gray-400 font-semibold transition duration-300">Go Back</button>
            </div>
        </div>
    )
}