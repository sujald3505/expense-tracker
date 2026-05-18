import { Router } from "express";
import { blockUser, deleteUser, getUsers, loginUsers, registerUser, UnblockUser } from "../controllers/user.controllers.js";

const userRoute = Router();

userRoute.post("/register",registerUser)
userRoute.post("/login",loginUsers)
userRoute.get("/",getUsers)
userRoute.delete("/:id",deleteUser)
userRoute.put("/block/:id",blockUser)
userRoute.put("/unblock/:id",UnblockUser)



export default userRoute;