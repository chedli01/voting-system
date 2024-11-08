import { useEffect, useState } from "react";

useEffect(()=>{
    const eventSource = new EventSource('http://localhost:3000/sendvote',{
        withCredentials: true,
    });
    eventSource.onmessage = (event)=>{
        setTeamId(parseInt(event.data))
    };

    return ()=>{
        eventSource.close();
    }


},[]);