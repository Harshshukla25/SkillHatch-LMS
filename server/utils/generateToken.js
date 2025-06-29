import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ _id: userId },"HARSHSHUKLA123", {
        expiresIn: "7d",
    });
};

export default generateToken;
