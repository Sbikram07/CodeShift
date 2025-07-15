require("dotenv").config()

const express=require('express')
const cors =require("cors")
const app=express()
const port=process.env.PORT || 3000
const connectDB=require("./config/db")
const cookieParser=require('cookie-parser')

const UserRouter=require("./routes/user.route")
const ChatRouter=require("./routes/chat.route")
connectDB()
app.use(cors({
  origin: process.env.CLIENT_URL, // ✅ your frontend's origin
  credentials: true               // ✅ allow cookies
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",UserRouter)
app.use("/api/chat",ChatRouter)


app.listen(port,()=>{
    console.log("server started at port:",port)
})

