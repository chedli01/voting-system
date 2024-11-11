import { Router } from "express";
import CurrentVote from "../mongodb/currentVoteSchema.mjs";

const route = Router();


route.get("/currentteam",async(req,res)=>{
    const team=await CurrentVote.find();
    return res.status(201).json({teamID:team.teamID})
})

export default route;