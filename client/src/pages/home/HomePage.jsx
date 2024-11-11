import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import './HomePage.css'
import hourGlass from "../../assets/time.png"

axios.defaults.withCredentials=true;

const VoteClosed = (
    <div className="home-container">
        <img src={hourGlass} alt="hourglass" width='80px' />
        <div className="home-vote-closed-message">
            <p>Team <span style={{color:'#790C18'}}>2</span> is still presenting vote will open soon</p>
        </div>
    </div>
)


const VoteOpen = (
    <div className="home-container vote-form-container">
        <h1 className="vote-open-title">Your vote for team <span style={{color:'#790C18'}}>5</span></h1>
        <form className="vote-form">
            <button name="vote-yes" id="vote-yes" type="submit" style={{backgroundColor:'#5F5A66'}}>Yes</button>
            <button name="vote-no" id="vote-no" type="submit" style={{backgroundColor:'#4D4855'}}>No</button>
        </form>
        <p style={{fontSize:'1.5em',fontWeight:'700'}}>01:45</p>
    </div>
)



export default function HomePage(){
    const [isVoteOpen,setIsVoteOpen] = useState(true);
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
        isVoteOpen ? VoteOpen:VoteClosed
    )
}