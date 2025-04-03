import { Children, cloneElement, useState } from "react"

export function Dropdown({ trigger, children, handleSelect }) {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsVisible(false)
    handleSelect(item.id)
  }

  return (
    <div className="border-2 rounded-sm z-10">
      <div onClick={() => setIsVisible(!isVisible)}>
        {selectedItem === null ? trigger : (
          <div className="w-full bg-white py-3 px-5 text-lg font-bold rounded-lg text-center">
            {selectedItem.name}
          </div>
        )}
      </div>
      {isVisible && (
        <ul className="flex flex-col">
          {Children.map(children, (child) =>
            cloneElement(child, { onClick: handleItemClick })
          )}
        </ul>
      )}
    </div>
  )
}

export function DropdownItem({ children, onClick, value = null }) {
  return (
    <li
      onClick={() => onClick(children)}
      className="w-full bg-white text-bold px-8 py-4 text-lg bg-gray-300 tracking-wider"
    >
      {value === null ? children : value}
    </li>
  )
}
