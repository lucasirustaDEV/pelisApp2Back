import mongoose from "mongoose";

let DB_URL = (process.env.DB_URL)

mongoose.connect(DB_URL)
    .then(() => console.log("Connection Sucess"))
    .catch(error => console.log(error))