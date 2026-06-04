// import { model, Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//     },

//     email: {
//       type: String,
//     },

//     password: {
//       type: String,
//     },

//     phone: {
//       type: String,
//       default: "",
//     },

//     gender: {
//       type: String,
//       default: "",
//     },

//     dob: {
//       type: String,
//       default: "",
//     },

//     address: {
//       type: String,
//       default: "",
//     },

//     profession: {
//       type: String,
//       default: "",
//     },

//     profileImage: {
//       type: String,
//       default: "",
//     },

//     role : {
//       type:String,
//       default: "USER",
//       enum: ["USER", "ADMIN"]
//     }
//   },

//   {
//     timestamps: true,
//   },
// );

// export const User = model("User", userSchema);
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    dob: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    profession: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);