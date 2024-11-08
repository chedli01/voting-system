import { Router } from "express";
import CurrentVote from "../mongodb/currentVoteSchema.mjs";
import Team from "../mongodb/teamSchema.mjs";

const route = Router();

route.post("/vote/:id",async(req,res)=>{
    const teamId=req.params.id;
    const vote=req.body.vote
    const currentvote=await CurrentVote.find();
    const id=currentvote[0].teamID
    if(req.cookies.connectionCookie && teamId==id){
        if(vote=="yes"){
            const nyes=await Team.findOne({id:id}).nyes
            await Team.updateOne({id:id},{$set:{nyes:nyes+1}})
        }
        else{
            const nno=await Team.findOne({id:id}).nno
            await Team.updateOne({id:id},{$set:{nno:nno+1}})


        }
        


    }
    else{
        res.sendStatus(400);
    }

})


export default route;