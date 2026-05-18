import mongoose, { model, Schema } from "mongoose";

const categorySchema =  new Schema(
    {
        name: {
        type: String,
        required: true,
      },
      
    },
    {
      timestamps: true,
    },
);


export const category = new model("Category",categorySchema)