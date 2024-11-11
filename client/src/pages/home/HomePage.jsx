import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import hourGlass from "../../assets/time.png";
import checkIcon from "../../assets/check-icon.png"
import { didUserVote, getCurrentTeam, sendVote, voteForId } from "../../service/api";

axios.defaults.withCredentials = true;

export default function HomePage() {
    const [teamId, setTeamId] = useState(1);
    const [userVote, setUserVote] = useState(null);
    const [hasVoted,setHasVoted] = useState(false);
    console.log(hasVoted)
    const navigate = useNavigate();

    const voteSubmitHandler = async (event) => {
        console.log(userVote)
        event.preventDefault();
        try {
            const response = await voteForId(teamId, { vote: userVote });
            console.log(response);
            if(response.voted){
                setHasVoted(true);
                console.log(hasVoted)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const VoteOpen = (
        <div className="home-container vote-form-container">
            <h1 className="vote-open-title">
                Your vote for team <span style={{ color: '#790C18' }}>{teamId}</span>
            </h1>
            <form className="vote-form" onSubmit={voteSubmitHandler}>
                <button
                    name="vote-yes"
                    id="vote-yes"
                    type="submit"
                    onClick={() => setUserVote('yes')}
                    style={{ backgroundColor: '#5F5A66' }}
                >
                    Yes
                </button>
                <button
                    name="vote-no"
                    id="vote-no"
                    type="submit"
                    onClick={() => setUserVote('no')}
                    style={{ backgroundColor: '#4D4855' }}
                >
                    No
                </button>
            </form>
            <p style={{ fontSize: '1.5em', fontWeight: '700' }}>01:45</p>
        </div>
    );

    const VoteClosed = (
        <div className="home-container">
            <img src={hourGlass} alt="hourglass" width="80px" />
            <div className="home-vote-closed-message">
                <p>The team is still presenting; voting will open soon</p>
            </div>
        </div>
    );

    const ThankYouForYourVote = (
        <div className="thank-you-container">
            <h1>Thank you for your vote</h1>
            <img src={checkIcon}/>
        </div>
    )

    useEffect(() => {
        // Check connection status on mount
        axios.get("http://localhost:3000/isconnected").then(
            (res) => {
                if (!res.data.connected) {
                    navigate("/register");
                }
            }
        );
    }, [navigate]); // Dependency on navigate

    useEffect(() => {
        // Fetch the team ID on mount
        const fetchTeamId = async () => {
            try {
                const result = await getCurrentTeam();
                setTeamId(result.teamID);
            } catch (error) {
                console.error("Error fetching team ID", error);
            }
        };
        fetchTeamId();
    }, []);

    useEffect(() => {
        // Set up EventSource to listen for changes in teamId
        const eventSource = new EventSource('http://localhost:3000/sendvote', {
            withCredentials: true,
        });
        eventSource.onmessage = (event) => {
            setTeamId(parseInt(event.data, 10)); // Parse to ensure a number
            setHasVoted(false);
        };

        return () => {
            eventSource.close(); // Clean up on unmount
        };
    }, []); // Only run once on mount

    useEffect(()=>{
        const checkHasVoted = async ()=>{
            try{
                const result = await didUserVote();
                console.log(result)
                if(result.hasVoted){setHasVoted(true)}
                else{setHasVoted(false)}
            }
            catch(error){

            }
        }
        checkHasVoted()
    },[])
    if(!hasVoted){
        return(
            teamId !== -1 ? VoteOpen : VoteClosed
        )
    
    }
    else         return ThankYouForYourVote

}
