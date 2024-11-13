import express from "express";
import cors from "cors";
import session from "express-session";
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
/* import fs from 'fs';
import https from 'https' */

/* const sslOptions = {
  cert: fs.readFileSync('/home/juniorentreprise/ssl/certs/voting_jeinsat_com_b3467_4e76f_1739204081_2e382c7909bbf6759c8663fc06424aac.crt'),
  key: fs.readFileSync('/home/juniorentreprise/ssl/keys/b3467_4e76f_03f374f85221b3c8addbb5fdbe6fd4c9.key'),
}; */


const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");  // Allow any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);  // Pre-flight response
  }
  next();
});

const corsOptions = {
  origin: ["https://voting.jeinsat.com"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  preflightContinue: false,
  optionsSuccessStatus: 200, // Add custom headers you expect
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Handle all preflight requests

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
const PORT = 3000 || process.env.PORT;


dbconfig();


//////////////////////////
app.use(statusRouter);
app.use(registerRouter);
app.use(positionRouter);
app.use(votingRouter);
app.use(sendingVoteRouter)
app.use(currentVoteRouter)
app.use(hasVotedRouter)

/////////////////////////
/* https.createServer(sslOptions, app).listen(PORT,"102.219.179.69", () => {
  console.log(`server running on port ${PORT}`);
});
 */
app.listen(PORT,"102.219.179.69", () => {
  console.log(`server running on port ${PORT}`);
})