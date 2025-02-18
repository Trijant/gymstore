const jwt=require("jsonwebtoken")
require("dotenv").config()

exports.auth=(req,res,next)=>{
    try{
        const token=req.body.token;

        if(!token){
            res.status(401).json({
                success:false,
                message:"token not found."
            })
        }

        //decoding jwt token
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode
        } catch(err){
            res.status(401).json({
                success:false,
                message:"error while decoding."
            })
        }
        next();
    } catch(err){
        res.status(401).json({
            success:false,
            message:"error while verifying."
        })
    }
}

exports.isBuyer=(req,res,next)=>{
    try{
        if(req.user.role!="Buyer"){
            return res.status(401).json({
                success:false,
                message:"you are not student"
            })
        }
        next();
    } catch(err){
        res.status(401).json({
            success:false,
            message:"error while identifying student."
        })
    }
}

exports.isSeller=(req,res,next)=>{
    try{
        if (req.user.role!="Admin"){
            return res.status(401).json({
                success:false,
                message:"you are not admin."
            })
        }
        next();
    } catch(err){
        res.status(401).json({
            success:false,
            message:"error while verifying admin."
        })
    }
}