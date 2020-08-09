import { findUserInDBWithContext } from "./../helpers/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginResponse, RegisterResponse, UserInfo, Context } from "../types";
import { User, UserModel } from "../models";

export const register = async (
  _: void,
  args: any,
): Promise<RegisterResponse> => {
  const { username, password } = args;
  const existingUser: number = await UserModel.countDocuments({ username });
  if (existingUser) {
    throw new Error("Username already used!");
  }
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: User = new UserModel({
    username,
    password: hashedPassword,
  });
  await user.save();
  return {
    id: user._id.toHexString(),
    username: user.username,
  };
};

export const login = async (_: void, args: any): Promise<LoginResponse> => {
  const { username, password } = args;
  const user: User | null = await UserModel.findOne({ username });
  if (!user) {
    throw new Error("Invalid login!");
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error("Invalid login!");
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "secret",
  );
  return {
    token,
  };
};

export const currentUser = async (
  _: void,
  _args: any,
  ctx: Context,
): Promise<UserInfo> => {
  const user = await findUserInDBWithContext(ctx);
  return {
    id: user._id.toHexString(),
    username: user.username,
  };
};
