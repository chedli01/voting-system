import { useLocation } from "react-router-dom"

export default function Error404Page(){
    const location = useLocation()
    const message = location.state?.message || "404 Oops..! Nothing here";
    return(
        <div>
            <h1>{message}</h1>
        </div>
        
    )
}