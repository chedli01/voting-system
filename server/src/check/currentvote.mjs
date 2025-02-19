import { Router } from "express";
import CurrentVote from "../mongodb/currentVoteSchema.mjs";

const route = Router();


route.get("/api/currentteam",async(req,res)=>{
    const team=await CurrentVote.find();
    const id=team[0].teamID;
    return res.status(201).json({teamID:id})
})

export default route;