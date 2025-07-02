// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// const userAuth=async (req,res,next)=>{
//     const {token}=req.cookies;
//     try{
//     if(!token){
//         return res.status(401).json({
//             message:"user not authenticated",
//             success:false
//         })
//     }
//     const decodeObj=await jwt.verify(token,process.env.JWT_SECRET);
//     if(!decodeObj){
//         return res.status(401).json({
//            message:"Invalid token",
//            success:false
//         })
//     }
//     const {_id}=decodeObj;
//     const user =await User.findById(_id);
//     if(!user){
//         throw new Error("user not found")
//     }
//     req.user=user;
//     req.id = user._id;
//     next();
// }catch(err){
//     res.status(400).send("ERROR: "+ err.message)
// }
// }
// export default userAuth




import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];
    const decodeObj = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeObj._id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    req.id = user._id;
    next();
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
};

export default userAuth;
