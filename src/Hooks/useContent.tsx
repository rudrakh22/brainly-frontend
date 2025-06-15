import { useEffect,useState } from "react";
import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useContent(){
    const [contents,setContents]=useState([]);
    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                "Authorization":localStorage.getItem("token")|| ""
            }
        }).then((response)=>{
            setContents(response.data.data)
        }).catch((error)=>{
            console.error("Error fetching content",error)
        })
    }
    useEffect(()=>{
        refresh()
        let interval=setInterval(()=>{
            refresh()
        },10*1000)
        return ()=>clearInterval(interval)
    },[])
    return {contents,refresh,setContents}
}