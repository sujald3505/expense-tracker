import { category } from "../models/category.model.js";

export const getCategory = async(req,res)=>{
    try {
        const categories = await category.find();
        res.status(200).json({success: true,categories});
    } catch (error) {
        res.status(500).json({message: error.message || "Internal Server Error" });
    }
}

export const addCategory =  async(req,res) => {
    try {
        const categories = await category.create({name});
        res.status(201).json({success: true,category});
    } catch (error) {
        res.status(500).json({message: error.message || "Internal Server Error"});
    }
    
}

export const deleteCategory = async(req,res)=>{
    try {
        const categories = await category.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message:"Category Deleted"});
    } catch (error) {
        res.status(500).json({message: error.message || "Internal Server Error"});
    }
}