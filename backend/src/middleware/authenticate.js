import { JWT_SECRET_KEY } from "../controllers/user.controllers.js";
import jwt from "jsonwebtoken";


export const authenticate = (req,res,next)=>{
    try {
        const authHeader = req?.headers?.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized token is missing"});
        }
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized: Invaild token formate" });
        }
        const token = authHeader?.split(" ")?.[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not Found "});
        }
        const decoded = jwt.verify(token,JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired"});
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid Token"});
            
        }
        return res.status(500).json({ message: error.message || "Internal server error"});
    }
}