import mongoose from "mongoose";

export default async function dbconfig(connectionString) {
  await mongoose
    .connect(`mongodb://mongo:27017/votingsystem?directConnection=true?replicaSet=rs0`,{serverSelectionTimeoutMS: 5000,directConnection:true})
    .then(() =>console.log("connected to db"))
    .catch((err) => console.log(err));
}