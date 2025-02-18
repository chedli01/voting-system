import { Router } from "express";
import CurrentVote from "../mongodb/currentVoteSchema.mjs";
import Voter from "../mongodb/voterSchema.mjs";
import verifyToken from "../middleware/authMiddleware.mjs";

const route = Router();

route.get("/hasvoted",verifyToken,async(req,res)=>{
    const team=await CurrentVote.find();
    const currentTeamID=team[0].teamID;
    const code=req.user?.code;
    if(code){
        const user=await Voter.findOne({code:code});
    const exist=user.votes.find(element => element == currentTeamID)!== undefined;
    return res.status(201).json({hasVoted:exist})
    }
    else{
        return res.sendStatus(200)
    }
    


})

export default route;