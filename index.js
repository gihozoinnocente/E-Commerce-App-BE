import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'

const app = express();


mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connected successfully"))
.catch((err)=>console.log(err))

app.listen(5000,()=>{
    console.log("Server is running ")
})