import close from "../../assets/close.svg"
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { authService } from "../../services/authService";
import { userService } from "../../services/userService";

export default function EditModal({onClose}){

    const {data: userData} = useFetch(authService.getCurrentUser)
    const [usernameText, setUsernameText] = useState('Loading...')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        if(userData?.username){
            setUsernameText(userData.username)
        }
    }, [userData])

    async function onConfirm(){
        try{
          if(userData){
            setIsLoading(true)
            const response = await userService.editAuthUser({username: usernameText})
            console.log(response.data)
            window.location.reload()
          }
        }
        catch(error){
            console.log(error.response?.data?.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    function handleChange(event){
        setUsernameText(event.target.value)
    }

    return(
        <div className="flex items-center justify-center fixed inset-0" style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
            <div className="flex flex-col items-center bg-[#D9D9D9] rounded-md border-3 border-[#292139] relative px-6 py-10 w-full max-w-[350px]">
                <p className="text-center text-2xl font-bold mb-5 tracking-wider">Edit Nickname?</p>
                <input className="border-2 border-[#292139] px-5 py-1 rounded-md font-bold bg-white mb-8" type="text" id="username" name="username" onChange={handleChange} value={usernameText}/>
                <button onClick={onConfirm} className="border-2 border-[#483D61] rounded-md bg-[#563897] text-white px-12 text-xl tracking-widest font-black">
                    Confirm
                </button>
                <button onClick={onClose} className="absolute top-5 right-7">
                    <img src={close} alt="Close Stats Modal" className="min-w-[15px]"/>
                </button>
            </div>
        </div>
    )
}