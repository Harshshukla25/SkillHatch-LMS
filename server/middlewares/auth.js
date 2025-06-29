import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userAuth=async (req,res,next)=>{
    const {token}=req.cookies;
    try{
    if(!token){
        return res.status(401).json({
            message:"user not authenticated",
            success:false
        })
    }
    const decodeObj=await jwt.verify(token,"HARSHSHUKLA123");
    if(!decodeObj){
        return res.status(401).json({
           message:"Invalid token",
           success:false
        })
    }
    const {_id}=decodeObj;
    const user =await User.findById(_id);
    if(!user){
        throw new Error("user not found")
    }
    req.user=user;
    req.id = user._id;
    next();
}catch(err){
    res.status(400).send("ERROR: "+ err.message)
}
}
export default userAuth