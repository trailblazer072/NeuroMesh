import express from "express";
import cors from "cors";
import userRoutes from "./routes/user";
import dotenv from "dotenv";

const app = express();
dotenv.config();


app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.use('/api/user', userRoutes);


app.listen(5000,()=>{
    console.log("Server is listening on 5000")
})