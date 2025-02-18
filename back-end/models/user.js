const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['buyer','seller'],
        default:'buyer'
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    }]

})

module.exports=mongoose.model("User",userSchema)