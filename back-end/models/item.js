const mongoose=require('mongoose')

const itemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    img:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("Item",itemSchema)