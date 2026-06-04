

import { Router } from "express";

import {
  deleteUser,
  getUsers,
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/user.controllers.js";

import { authenticate } from "../middleware/authenticate.js";
import { upload } from "../middleware/uploadMiddleware.js";

const userRoute = Router();

// ============================
// REGISTER
// ============================

userRoute.post(
  "/register",
  registerUser
);

// ============================
// LOGIN
// ============================

userRoute.post(
  "/login",
  loginUser
);

// ============================
// GET PROFILE
// ============================

userRoute.get(
  "/profile",
  authenticate,
  getProfile
);

// ============================
// UPDATE PROFILE
// ============================

userRoute.put(
  "/profile",
  authenticate,
  upload.single("profileImage"),
  updateProfile
);

// ============================
// CHANGE PASSWORD
// ============================

userRoute.put(
  "/change-password",
  authenticate,
  changePassword
);

// ============================
// GET ALL USERS
// ============================

userRoute.get(
  "/",
  authenticate,
  getUsers
);

// ============================
// DELETE USER
// ============================

userRoute.delete(
  "/:id",
  authenticate,
  deleteUser
);

export default userRoute;