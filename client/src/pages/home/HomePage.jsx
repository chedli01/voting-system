import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import hourGlass from "../../assets/time.png";
import checkIcon from "../../assets/check-icon.png"
import { didUserVote, getCurrentTeam, sendVote, voteForId,checkConnection,verifyPosition } from "../../service/api";
import { routes } from "../../service/apiRoutes";
import { useReducer } from "react";

axios.defaults.withCredentials = true;

const initialState = {
    teamId: -1,
    hasVoted: false,
    userVote: null,
    mode: 'voteIsClosed', // 'voteIsOpen', 'thankYouForVoting'
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TEAM_ID":
            return { ...state, teamId: action.payload };
        case "SET_HAS_VOTED":
            return { ...state, hasVoted: action.payload };
        case "SET_USER_VOTE":
            return { ...state, userVote: action.payload };
        case "SET_MODE":
            return { ...state, mode: action.payload };
        default:
            return state;
    }
};

export default function HomePage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    // Async functions
    const fetchTeamId = async () => {
        try {
            const result = await getCurrentTeam();
            dispatch({ type: "SET_TEAM_ID", payload: result.teamID });
        } catch (error) {
            console.error("Error fetching team ID", error);
        }
    };

    const checkPosition = async () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
                const result = await verifyPosition({ latitude: userLatitude, longitude: userLongitude });
                if (!result.valid) navigate("/xx");
            },
            (error) => console.error("Geolocation error:", error),
            { enableHighAccuracy: true, timeout: 1000 * 120, maximumAge: 0 }
        );
    };

    const verifyConnection = async () => {
        try {
            const result = await checkConnection();
            if (!result.connected) navigate("/register");
        } catch (error) {
            console.error("Error verifying connection", error);
        }
    };

    const checkHasVoted = async () => {
        try {
            const result = await didUserVote();
            if (result.hasVoted) {
                dispatch({ type: "SET_HAS_VOTED", payload: true });
                dispatch({ type: "SET_MODE", payload: "thankYouForVoting" });
            }
        } catch (error) {
            console.error("Error checking vote status", error);
        }
    };

    const voteSubmitHandler = async (event, userVote) => {
        event.preventDefault();
        try {
            const response = await voteForId(state.teamId, { vote: userVote });
            if (response.voted) {
                dispatch({ type: "SET_HAS_VOTED", payload: true });
                dispatch({ type: "SET_MODE", payload: "thankYouForVoting" });
            }
        } catch (error) {
            console.error("Error submitting vote", error);
        }
    };

    // useEffect hooks
    useEffect(() => {
        checkPosition();
        verifyConnection();
        fetchTeamId();
        checkHasVoted();
    }, []);

    useEffect(() => {
        const eventSource = new EventSource(routes.SEND_VOTE, { withCredentials: true });
        eventSource.onmessage = (event) => {
            const newTeamId = parseInt(event.data, 10);
            dispatch({ type: "SET_TEAM_ID", payload: newTeamId });
            dispatch({ type: "SET_HAS_VOTED", payload: false });
            dispatch({ type: "SET_MODE", payload: "voteIsClosed" });
        };
        eventSource.onerror = () => {
            console.log('Connection lost. Reconnecting...');
            window.location.reload();
        };

        return () => eventSource.close();
    }, []);

    // UI Components
    const VoteOpen = (
        <div className="home-container vote-form-container">
            <h1 className="vote-open-title">
                Your vote for team <span style={{ color: '#790C18' }}>{state.teamId}</span>
            </h1>
            <form
                className="vote-form"
                onSubmit={(event) => voteSubmitHandler(event, state.userVote)}
            >
                <button
                    name="vote-yes"
                    id="vote-yes"
                    type="submit"
                    onClick={() => dispatch({ type: "SET_USER_VOTE", payload: "yes" })}
                    style={{ backgroundColor: '#5F5A66' }}
                >
                    Yes
                </button>
                <button
                    name="vote-no"
                    id="vote-no"
                    type="submit"
                    onClick={() => dispatch({ type: "SET_USER_VOTE", payload: "no" })}
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
            <img src={checkIcon} alt="check-icon" />
        </div>
    );

    // Render based on mode
    if (state.mode === "voteIsOpen") return VoteOpen;
    if (state.mode === "thankYouForVoting") return ThankYouForYourVote;
    return VoteClosed;
}
