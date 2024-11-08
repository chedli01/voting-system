import { useEffect, useState } from "react";
function App() {
  const [teamId,setTeamId] = useState(-1);
  
  useEffect(()=>{
      const eventSource = new EventSource('http://localhost:3000/sendvote',{
          withCredentials: true,
      });
      eventSource.onmessage = (event)=>{
          setTeamId((prev)=>{event.data})
      };
  
      return ()=>{
          eventSource.close();
      }
  
  
  },[]);

  return (
    <>
    <h1>{teamId}</h1>
    </>
  )
}

export default App
