import { Children, cloneElement, useState, useEffect} from "react";

export function Dropdown({trigger, children, isSent, handleSelect}){
    const [isVisible, setIsVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedItemCode, setSelectedItemCode] = useState(null)

    const handleItemClick = (item) => {
        setSelectedItem(item)
        setIsVisible(false)
    }

    useEffect(()=>{
        if(isSent){
            handleSelect(selectedItem.id)
        }
    }, [isSent])

    useEffect(()=>{
        setSelectedItemCode(
            <div className="w-full bg-white py-3 px-5 text-lg font-bold rounded-lg text-center">
                {selectedItem?.name}
            </div>
        )
    }, [selectedItem])

    return(
        <div className="border-2 rounded-sm z-10">
            <div onClick={()=>{setIsVisible(!isVisible)}}>
                {selectedItem === null
                    ? trigger
                    : selectedItemCode}
            </div>
            {isVisible && (
                <ul className="flex flex-col">
                    {Children.map(children, child => (
                        cloneElement(child, {onClick: handleItemClick})
                    ))}
                </ul>
            )}
        </div>
    )
}

export function DropdownItem({children, onClick, key, value=null}){
    return(
        <li key={key} onClick={()=>{onClick(children)}} className="w-full bg-white text-bold px-8 py-4 text-lg bg-gray-300 rounded-sm tracking-wider">
            {value === null
                ? children
                : value
                }
        </li>
    )
}