import mongoose from "mongoose";

const currentVoteSchema=new mongoose.Schema({
    teamID:{
        type:mongoose.Schema.Types.Number,
        required:true,
        unique:true
    },
    voteNumber:{
        type:mongoose.Schema.Types.Number,
        required:true,
        unique:true,
    },
    time:{
        type:mongoose.Schema.Types.Number,
        required:true,
        unique:true,
    }

})

const CurrentVote=mongoose.model("currentVotes",currentVoteSchema)
export default CurrentVote;