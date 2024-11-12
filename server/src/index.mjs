import express from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import dbconfig from "./mongodb/connect.mjs";
import Voter from "./mongodb/voterSchema.mjs";
import Team from "./mongodb/teamSchema.mjs";
import CurrentVote from "./mongodb/currentVoteSchema.mjs";
import statusRouter from "./check/status.mjs"
import registerRouter from "./register/register.mjs"
import positionRouter from "./check/position.mjs"
import votingRouter from "./vote/voting.mjs"
import sendingVoteRouter from "./vote/sendvote.mjs"
import currentVoteRouter from "./check/currentvote.mjs"
import hasVotedRouter from "./check/hasvoted.mjs"
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname)
const corsOptions = {
  origin: ["https://voting.jeinsat.com"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      // sameSite: 'None',       // Allows cross-origin cookies

      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);



dbconfig();


//////////////////////////
app.use(statusRouter);
app.use(registerRouter);
app.use(positionRouter);
app.use(votingRouter);
app.use(sendingVoteRouter)
app.use(currentVoteRouter)
app.use(hasVotedRouter)


///////////////////////
const PORT = 3000 || process.env.PORT;


app.use(express.static(path.join(__dirname,"../../client/dist")))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../../client/dist","index.html"))
})




/////////////////////////
app.listen(PORT,"0.0.0.0", () => {
  console.log(`server running on port ${PORT}`);
});
