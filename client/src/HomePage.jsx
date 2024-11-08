import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials=true;

export default function HomePage(){
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3000/isconnected").then(
            (res)=>{
                if(!(res.data.connected)){
                    navigate("/register");
                }
            }
        );
    },[])

    return(
        <>
        </>
    )
}