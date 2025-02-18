const user=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()


exports.signup=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;

        //checking user already exists or not.
        const existingUser=await user.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists.",
                data:existingUser
            })
        }

        //encripting password
        let hashedPassword;
        let noOfRounds=10
        try{
            hashedPassword=await bcrypt.hash(password,noOfRounds)
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"error while hashing."
            })
        }

        //making entry of user in DB.
        const response=user.create({name,email,password:hashedPassword,role})
        return res.status(200).json({
            success:true,
            data:response,
            message:"signup successful."
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message

        })
    }
}

exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body

        if (!email ||!password){
            return res.status(400).json({
                success:false,
                message:"fill all the details.",
            })
        }

        let userCredentials=await user.findOne({email})
        if(!userCredentials){
            return res.status(401).json({
                success:false,
                message:"Please sign-up first."
            })
        }


        //verify password and generate JWT token
        const payload={
            email:userCredentials.email,
            id:userCredentials._id,
            role:userCredentials.role,
        }
        if(await bcrypt.compare(password,userCredentials.password)){
            let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});

            userCredentials=userCredentials.toObject()
            userCredentials.token=token;
            userCredentials.password=undefined;

            //creating cookie
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                userCredentials,
                token,
                message:"login successful"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password incorrect."
            })
        }

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message

        })
    }
}