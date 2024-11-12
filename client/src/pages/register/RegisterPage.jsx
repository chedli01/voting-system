import "./RegisterPage.css"
import enter from "../../assets/enter.png"
import jeiLogo from "../../assets/jei2.png"
import { useEffect, useState } from "react"
import { registerUser } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { checkConnection } from "../../service/api";
export default function RegisterPage(){

    /* const [userInput,setUserInput] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
        const isConnected = async ()=>{
            try{
                const result = await checkConnection();
                console.log(result);
                if(result.connected){
                    navigate("/home")
                }
            }
            catch(error){
                console.log(error);
            }
        }
        isConnected();
    },[]) */

    const submitHandler = async (event)=>{
        event.preventDefault();
        try{
        const result = await registerUser(userInput);
        navigate("/home");
        console.log(result);
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <div className="register-form-container">
            <img src={jeiLogo} alt="JEILogo" width="100px" height="50px"/>
            <div className="title-container">
                <h1 className="title-1">Hack for good</h1>
                <h1 className="title-2">3.0</h1>
            </div>
            <h2 style={{fontSize:'1em', color:'rgba(255,255,255,0.55)'}}>Voting System</h2>
            <form onSubmit={submitHandler}>
                <input type="text" name="unique-code" id="unique-code" placeholder="Enter your code" value={userInput} onChange={(e)=>{setUserInput(e.target.value)}}/>
                <button id="register-form-submit" type="submit"><img src={enter} width='24px' height='30px'/></button>
            </form>
        </div>
    )
}