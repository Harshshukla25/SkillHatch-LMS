import validator from "validator";

const validateSignUpData=(req)=>{
    const {
    name,
    email,
    password
    }=req.body;
    if(!name){
        throw new Error("Name is not valid!");
    }
    else if(name.length<4 || name.length>50){
        throw new Error("Name exceeds limit");
    } 
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong passsword")
    }
};

export default validateSignUpData;