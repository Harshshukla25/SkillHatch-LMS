import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://harshshuklahs2503:bEkP7Z0RBdSMHp9w@finalproject.phohasu.mongodb.net/skillHatch");
        console.log('MongoDB Connected');
    }catch(error){
     console.log("error occured",error);
    }
}
export default connectDB; 