import type { ReactElement } from "react"

const SidebarItems = ({text,icon}:{
  text:string,
  icon:ReactElement
}) => {
  return (
    <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-400 rounded max-w-48 pl-4 transition-all duration-150 items-center w-full">
        <div className="pr-2">{icon}</div>
        <div className="text-gray-700">
          {text}
        </div>
    </div>
  )
}

export default SidebarItems
