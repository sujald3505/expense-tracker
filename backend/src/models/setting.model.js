import mongoose, { model,  Schema } from "mongoose";

const settingSchema = new Schema(
    {
      currency:{
        type: String,
        default: "INR",
      },
      theme:{
        type: String,
        default:"light",
      } ,
       
    },
    {
        timestamps: true,
    }
);

export const setting = new model("setting",settingSchema)