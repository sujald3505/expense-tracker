import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const JWT_SECRET_KEY = "jdhgureyhj";

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;

    const hasedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hasedPassword;

    const hasedPasswordd = await bcrypt.hash(userData.confirmPassword, 10);
    userData.confirmPassword = hasedPasswordd;

    const user = await Users.create(userData);
    res.status(201).json({ message: "User Created", user });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email is wrong" });
    }
    const isVaild = await bcrypt.compare(password, user.password);

    if (!isVaild) {
      return res.status(400).json({ message: " Password is wrong" });
    }

    const token = await jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successfully", user, token });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ message: "user fetched", users });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
        const user = await User.findById(req.params.id);
        if (!user) {
        return res.status(404).json({ message: "User not found",});
        }

        await user.deleteOne();

        res.status(200).json({ success: true,message: "User deleted",});
  } catch (error) {
       res.status(500).json({ message: error.message,});
  }
};

export const blockUser = async(req,res) =>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User Not found",})
        }
        user.isBlocked = true;
        await user.save();
        res.status(200).json({ success: true, message: "User blocked",});
    } catch (error) {
         res.status(500).json({ message: error.message,});
    }
}


export const UnblockUser = async(req,res) =>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User Not found",})
        }
        user.isBlocked = true;
        await user.save();
        res.status(200).json({ success: true, message: "User Unblocked",});
    } catch (error) {
         res.status(500).json({ message: error.message,});
    }
}
