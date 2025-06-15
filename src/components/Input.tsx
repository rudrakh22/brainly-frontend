
interface inputProps{
    placeholder:string;
    reference?:any
}

const Input = ({placeholder,reference}:inputProps) => {
    return (
        <div>
            <input 
                type="text" 
                ref={reference}
                placeholder={placeholder}
                className="px-4 py-2 rounded-md border border-gray-300 focus:ring focus:border-purple-500 outline  focus:outline-purple-700 w-full"
            />
        </div>
    )
}

export default Input
