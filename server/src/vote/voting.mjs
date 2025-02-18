import { Router } from "express";
import CurrentVote from "../mongodb/currentVoteSchema.mjs";
import Team from "../mongodb/teamSchema.mjs";
import Voter from "../mongodb/voterSchema.mjs";
import verifyToken from "../middleware/authMiddleware.mjs";

const route = Router();

route.post("/vote/:id",verifyToken,async(req,res)=>{
    const teamId=req.params.id;
    const vote=req.body.vote;
    const currentvote=await CurrentVote.find();
    const id=currentvote[0].teamID
    const userR = req.user
    console.log(userR)
    if(userR && teamId==id ){
        const user=await Voter.findOne({code:userR.code});
        const length=user.votes.length;
        const total=currentvote[0].voteNumber;
        const exist=user.votes.find(element => element == teamId)!== undefined;
        if(length>=0.75*total && !exist){
            if(vote=="yes"){
                const nyes=await Team.findOne({id:id})
                await Team.updateOne({id:id},{$set:{nyes:parseInt(nyes.nyes)+1}})
            }
            else{
                const nno=await Team.findOne({id:id})
                await Team.updateOne({id:id},{$set:{nno:parseInt(nno.nno)+1}})
    
    
            }
            await Voter.updateOne({code:userR.code},{$push:{votes:parseInt(teamId)}})
            return res.status(201).json({voted:true})
        }
       
        else{
            return res.status(201).json({voted:false});
        }


    }
    else{
        return res.status(201).json({voted:false});
    }

})


export default route;