import { Router } from "express";
import CurrentVote from "../mongodb/currentVoteSchema.mjs";
import Team from "../mongodb/teamSchema.mjs";
import Voter from "../mongodb/voterSchema.mjs";
import verifyToken from "../middleware/authMiddleware.mjs";
import mongoose from "mongoose";

const route = Router();

route.post("/vote/:id",verifyToken,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
    const teamId=req.params.id;
    const vote=req.body.vote;
    const currentvote=await CurrentVote.find().session(session);
    const id=currentvote[0].teamID
    const userR = req.user
    if(userR && teamId==id ){
        const user=await Voter.findOne({code:userR.code}).session(session);
        const length=user.votes.length;
        const total=currentvote[0].voteNumber;
        const exist=user.votes.find(element => element == teamId)!== undefined;
        if(length>=0.75*total && !exist){
            if(vote=="yes"){
                await Team.updateOne({id:id},{$inc:{nyes:1}}).session(session)
            }
            else{
                await Team.updateOne({id:id},{$inc:{nno:1}}).session(session)
    
    
            }
            await Voter.updateOne({code:userR.code},{$push:{votes:parseInt(teamId)}}).session(session)

            await session.commitTransaction();
            session.endSession();

            return res.status(201).json({voted:true})
        }
       
        else{
            await session.abortTransaction(); // Abort if conditions aren't met
        session.endSession();
            return res.status(201).json({voted:false});
        }


    }
    else{
        await session.abortTransaction(); // Abort if invalid
      session.endSession();
        return res.status(201).json({voted:false});
    }}
    catch(err){

        await session.abortTransaction(); // Abort on any error
    session.endSession();
    console.error("Error during voting process:", error);
    return res.status(500).json({ error: "Voting failed" });
    }

})


export default route;