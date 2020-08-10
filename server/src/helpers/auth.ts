import { User, UserModel } from "../models";
import { Context } from "../types";

export const findUserInDBWithContext = async (ctx: Context): Promise<User> => {
  const { userInfo } = ctx;
  if (!userInfo) {
    throw new Error("Not authenticated!");
  }
  const user: User | null = await UserModel.findOne({ _id: userInfo.id });
  if (!user) {
    throw new Error("Not authenticated!");
  }
  return user;
};
