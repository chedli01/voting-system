import { Router } from "express";
import CurrentVote from "../mongodb/currentVoteSchema.mjs";

const route = Router();


route.get("/sendvote",async(req,res)=>{
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const changeStream = CurrentVote.watch([], { fullDocument: "updateLookup" });
    changeStream.on("change", async (change) => {
        if (
          change.updateDescription.updatedFields.teamID &&
          change.fullDocument.teamID != -1
        ) {


            res.write(`data: ${change.fullDocument.teamID}\n\n`)
          

        }
        else if(change.updateDescription.updatedFields.teamID &&
            change.fullDocument.teamID == -1){
                res.write(`data: ${-1}\n\n`)

            }
      });
    req.on("close", () => {
        changeStream.close();
        res.end();
      });
})






export default route;