const express=require("express")
const app=express()
const router=require("./routes/gymstoreRoutes")
const fileUpload=require("express-fileupload")

require("dotenv").config()
const port=process.env.PORT || 4000

const connectDB=require("./config/database")
connectDB()

const cloudinary=require("./config/cloudinary")
cloudinary.cloudinaryConnect() 

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
})) 
app.use(express.json())
app.use("/api/v1",router)

app.listen(port,()=>{
    console.log(`app is running on port: ${port}`)
})

app.get("/",(req,res)=>{
    res.send("<h1>This is home page.</h1>")
})