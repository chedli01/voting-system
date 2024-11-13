import mongoose from "mongoose";

export default async function dbconfig() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/votingsystem?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3&replicaSet=rs0")
    .then(() =>console.log("connected to db"))
    .catch((err) => console.log(err));
}