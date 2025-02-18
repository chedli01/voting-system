import { Router } from "express";
import Voter from "../mongodb/voterSchema.mjs";
import jwt from "jsonwebtoken"

const route = Router();

route.post("/register", async (req, res) => {
  const userCode = req.body.code;

  const user = await Voter.findOne({ code: userCode });

  if (user) {
    const token = await jwt.sign({code:userCode},'secret',{expiresIn:'1h'})
    res.cookie('authToken',token,{
      maxAge:1000*60*60,
      secure:false,
      httpOnly:false,
      sameSite:'lax'
    })


    return res.status(201).json({ status: "succeeded" });
  } else {
    return res.status(400).json({ status: "failed" });
  }
});

export default route;
