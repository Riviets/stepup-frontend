

export default function ConfirmModal({message, onConfirm, onClose}){
    return(
        <div className="flex items-center justify-center fixed inset-0" style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
            <div className="bg-white w-[100%] max-w-[300px] pt-5 px-8 pb-10 rounded-md border-2 border-[#292139]">
                <p className="text-center mb-5 text-lg font-bold">Are you sure you want to {message}?</p>
                <div className="flex justify-between max-w-[150px] mx-auto">
                    <button className="bg-green-500 text-white px-4 border-1 border-[#292139] shadow-lg rounded-md text-lg font-black" onClick={onConfirm}>Yes</button>
                    <button className="bg-red-400 text-white  px-4 border-1 border-[#292139] shadow-lg rounded-md text-lg font-black" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    )
}