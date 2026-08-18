import express from "express";
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes";

const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(_req,res)=>{
    res.status(200).json({
        success:true,
        message:"vtak is running 🤐🔔"
    })
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app