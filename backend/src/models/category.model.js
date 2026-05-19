// import mongoose, { model, Schema } from "mongoose";

// const categorySchema =  new Schema(
//     {
//         name: {
//         type: String,
//         required: true,
//       },

//     },
//     {
//       timestamps: true,
//     },
// );

// export const category = new model("Category",categorySchema)
import mongoose, { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,

      required: true,

      trim: true,

      unique: true,
    },
  },

  {
    timestamps: true,
  },
);

export const Category = model("Category", categorySchema);
