import mongoose from "mongoose";

export interface User extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const UserModel = mongoose.model<User>("User", UserSchema, "Users");
