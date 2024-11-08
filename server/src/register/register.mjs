import { Router } from "express";
import Voter from "../mongodb/voterSchema.mjs";

const route = Router();

route.post("/register", async (req, res) => {
  const userCode = req.body.code;

  const user = await Voter.findOne({ code: userCode });

  if (user) {
    res.cookie(
      "connectionCookie",
      { code: userCode },
      {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true,
        sameSite: "lax",
      }
    );
    return res.json({ status: "succeeded" });
  } else {
    return res.json({ status: "failed" });
  }
});

export default route;
