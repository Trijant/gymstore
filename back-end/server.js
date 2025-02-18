const express=require("express")
const app=express()
const router=require("./routes/gymstoreRoutes")

require("dotenv").config()
const port=process.env.PORT || 4000

const connectDB=require("./config/database")
connectDB()

app.use(express.json())
app.use("/api/v1",router)

app.listen(port,()=>{
    console.log(`app is running on port: ${port}`)
})

app.get("/",(req,res)=>{
    res.send("<h1>This is home page.</h1>")
})