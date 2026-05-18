import { model , Schema} from "mongoose";

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        confirmPassword: String

    }
)

export const Users = new model ("users",userSchema)
