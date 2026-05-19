// import mongoose, {model, Schema } from "mongoose";


// const transactionSchema = new Schema(
//     {
//         title:{
//             type: String,
//             required: true,
//         },
//         amount:{
//             type: Number,
//             required: true,
//         },
//         type:{
//             type: String,
//             enum: ["income","expense"],
//             required: true,
//         },
//         category:{
//             type: String,
//             required: true,
//         },
//         date:{
//             type: Date,
//             default: Date.now,
//         },
//         user:{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//         },

//     },
//             {
//                 timestamps: true,
//             }
// ); 

// export const Transaction = new model ("transaction",transactionSchema)
import mongoose, {
  model,
  Schema,
} from "mongoose";

const transactionSchema =
  new Schema(

    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      type: {
        type: String,

        enum: [
          "income",
          "expense",
        ],

        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      date: {
        type: Date,
        default: Date.now,
      },

      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

export const Transaction =
  model(
    "Transaction",
    transactionSchema
  );