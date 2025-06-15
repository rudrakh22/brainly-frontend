import type { ReactElement } from "react"

interface ButtonProps{
  variant:"primary"|"secondary",
  text:string,
  startIcon?:ReactElement;
  onClick?:()=>void;
  fullWidth?:boolean;
  loading?:boolean;
}
const variantClasses={
  "primary":"bg-purple-600 text-white hover:text-gray-300 ",
  "secondary":"bg-purple-200 text-purple-600 hover:text-purple-800"
}

const defaultStyles="px-4 py-2 rounded-md flex items-center gap-2 font-light hover:shadow-md";

const Button = ({variant,text,startIcon,onClick,fullWidth,loading}:ButtonProps) => {
  return (
    <button 
    onClick={onClick}
    className={variantClasses[variant]+" "+ defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}` } disabled={loading} >
      {startIcon}
      <p >{text}</p>
    </button> 
  )
}

export default Button
