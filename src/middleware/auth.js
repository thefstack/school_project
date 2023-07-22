const jwt=require("jsonwebtoken");
const admin=require('../models/adminlogin');
const path=require('path')

const auth=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
        const user=await admin.findById({_id:verifyUser._id});
        req.token=token;
        req.user=user;

        next();
    }catch(err){
        res.status(401).redirect("/adminlogin");
        console.log("Unauthorized");
    }
}

module.exports=auth;