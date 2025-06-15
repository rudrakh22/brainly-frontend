import {useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast"
import Card from "../components/Card";
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL

const SharedBrain = () => {
    const {shareLink}=useParams();
    console.log("shareLing",shareLink)
    const [content,setContent]=useState([])
    const fetchContents=async()=>{
        const response=await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
        setContent(response.data.content)
    }
    useEffect(()=>{
        fetchContents()
    },[])
    function handleDeleteCard(){
        toast.error("You cannot edit the content")
    }
    return (
        <div className="flex p-8 w-screen h-screen">
            <div className="flex flex-col gap-10 w-full">
                <h1 className="text-4xl font-semibold text-purple-600 text-center w-full">Shared Brain</h1>
            {content?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {content.map(({ _id, type, link, title }) => (
                    <Card
                        key={_id}
                        id={_id}
                        type={type}
                        title={title}
                        link={link}
                        onDelete={handleDeleteCard}
                    />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full h-full">
                <p className="text-2xl font-semibold text-gray-500">No Content Found</p>
                </div>
            )}
            </div>
        </div>
    )
}

export default SharedBrain
