const mongoose=require("mongoose")
require("dotenv").config()

const connectDB=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("database connection successful.")
    })
    .catch((err)=>{
        console.error(err.message)
        process.exit(1)
    })
}

module.exports=connectDB