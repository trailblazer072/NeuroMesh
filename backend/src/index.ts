import express from "express";
import  prismaClient  from "./config/db";

const app = express();

app.listen(5000,()=>{
    console.log("Server is listening on 5000")
})

app.post('/create',async(req,res)=>{
    const user = await prismaClient.user.create({
        data:{
            userName:"Daksh",
        }
    })
    res.json({
        user
    })
})
