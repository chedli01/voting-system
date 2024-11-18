import { Router } from "express";
import CurrentVote from "../mongodb/currentVoteSchema.mjs";
import Team from "../mongodb/teamSchema.mjs";
import Voter from "../mongodb/voterSchema.mjs";

const route = Router();

route.post("/api/vote/:id",async(req,res)=>{
    const teamId=req.params.id;
    const vote=req.body.vote
    const currentvote=await CurrentVote.find();
    const id=currentvote[0].teamID
    if(req.cookies.connectionCookie && teamId==id ){
        const user=await Voter.findOne({code:req.cookies.connectionCookie.code});
        const length=user.votes.length;
        const total=currentvote[0].voteNumber;
        const exist=user.votes.find(element => element == teamId)!== undefined;
        

        if(length>=Math.floor(0.75*total) && !exist){
            const team=await Team.findOne({id:id});
            const nyes=team.nyes;
            const nno=team.nno;
            if(vote=="yes"){
                await Team.updateOne({id:id},{$set:{nyes:parseInt(nyes)+1}})
                Team.updateOne({id:id},{$set:{score:(nyes+1)/(nno+nyes+1)}});
            }
            else{
                await Team.updateOne({id:id},{$set:{nno:parseInt(nno)+1}})
                Team.updateOne({id:id},{$set:{score:nyes/(nno+1+nyes)}});
            }
            await Voter.updateOne({code:req.cookies.connectionCookie.code},{$push:{votes:parseInt(teamId)}});
           
            
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